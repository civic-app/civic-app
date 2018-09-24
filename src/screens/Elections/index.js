import React from 'react';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Icon } from 'react-native-elements';
import { loadUser } from '../../user/sagas'
import { getIsLoggedIn } from '../../auth/selectors';
import { getCandidateData } from './Screen.js'
import WithAuthentication from '../../util/components/WithAuthentication';
import { getCandidates, loadCandidates } from '../../candidate/redux/candidates';
import {Image, StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';


class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Electionz',
  };
  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });
  static propTypes = propTypes;
  render() {
    return <Container goToCandidateDetail={this.goToCandidateDetail} {...this.props} />;
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

const distinctPositions = new Set()
const ElectionsView = props => (
  <View style={styles.container}>
    {props.candidates.map(candidate => (
      distinctPositions.add(candidate.electionIds.toString())
    ))}
    <FlatList
      data={[...distinctPositions]}
      keyExtractor={(item)=>item}
      renderItem={({item})=> (
        <View key={item} style={styles.candidateContainer}>
          <View style={styles.informationContainer}>
            <Text style={styles.positionText}>{item} </Text>
            <Text style={styles.electionText}>November 6, 2018</Text>
          </View>
          <ScrollView horizontal={true}>
            {props.candidates.map(candidate => (
              (item === candidate.electionIds.toString())
                ?
                <View key={candidate.id}>
                  <Data candidateId={candidate.id} goToCandidateDetail={props.goToCandidateDetail} />
                </View>
                :
                null
            ))}
          </ScrollView>
        </View>
      )}/>
  </View>
);

ElectionsView.propTypes = {
  goToCandidateDetail: PropTypes.func,
  candidates: PropTypes.array,
};

const DataContainer = (props) => (
  <View style={styles.container}>
    <View key={props.data.id} style={styles.container}>
      <View style={styles.newsCard}>
        <View style={styles.pictureBody}>
          <TouchableOpacity onPress={props.goToCandidateDetail(props.data.id)}> 
            <Image style={styles.candidatePicture}
              source={{ uri: props.data.image}} 
            />
            <FavoriteContainer isFavorite={props.data.isFavorite}/>
          </TouchableOpacity>
        </View> 
        <View style={styles.contentContainer}>
          <View style={styles.contentBody}>
            <Text style={styles.matchCardText}>
              <Text style={styles.nameText}>{props.data.name}{'\n\n'}</Text>  
              {props.data.matchPercent != undefined
                ?
                <Text style={styles.matchCardPercentText}>{props.data.matchPercent}{'%'}</Text>
                :
                <Text>{'No'}</Text>
              }{' match'}
            </Text>
          </View>
        </View>   
      </View> 
    </View>
  </View>
);
DataContainer.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  goToCandidateDetail: PropTypes.func,
  name: PropTypes.string,
  electionIds: PropTypes.string,
  image: PropTypes.string,
  matchPercent: PropTypes.number,
};

const FavoriteContainer = props => (
  <View style={styles.container}>
    {props.isFavorite ?
      <View style={styles.favoriteBody}>
        <Icon
          name={'star'}
          iconStyle={styles.favorite}
          size={15}
        />
        <Text style={styles.favoriteText}>{'Favorite'}</Text>
      </View> 
      :
      null
    }
  </View>
);
FavoriteContainer.propTypes = {
  isFavorite: PropTypes.bool,
};

const Data = connect(
  (state, ownProps) => ({
    data: getCandidateData(state, ownProps.candidateId),
  }),
)(DataContainer);

const ScreenWithAuthentication = WithAuthentication('logout')(ElectionsView);

const Container = compose(
  connect(
    state => ({
      candidates: getCandidates(state, toListCandidateMapperPlaceholder),
      isLoggedIn: getIsLoggedIn(state),
    }),
    { loadCandidates, loadUser },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      // TODO: only load user if match data has not been loaded yet
      this.props.loadUser();
    },
  }),
)(ScreenWithAuthentication);

const toListCandidateMapperPlaceholder = candidate => ({id: candidate.id, electionIds:candidate.electionIds,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent:'space-between',
    alignItems: 'stretch',
  },  
  candidateContainer: {
    alignItems: 'flex-start',
    marginTop: 15,
    flex: 1,
    paddingBottom: 15,
    backgroundColor: Colors.white,
  },
  informationContainer: {
    padding:20,
  },
  contentContainer: {
    marginLeft:15,
  },
  contentBody: {
    padding:20,
    width: 200,
    backgroundColor: Colors.white,
    borderRadius: 2,
    ...Mixins.shadow
  },
  pictureBody: {
    marginLeft: 15,
    height: 150,
    width: 200, 
    backgroundColor: Colors.white,
    borderRadius: 2,
    ...Mixins.shadow
  }, 
  favoriteBody: {
    flexDirection:'row',
    position: 'absolute',
    left: 10,
    top: 120,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  nameText: {
    fontSize: 18,
  },
  positionText : {
    fontSize : 20,
    fontWeight: 'bold',
  },
  electionText: {
    fontSize : 18,
  },
  favoriteText: {
    textAlign: 'center',
    fontSize: 12,
    color:Colors.white,
  },
  matchCardText: {
    textAlign: 'left',
    fontSize: 16,
  },
  matchCardPercentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  candidatePicture: {
    resizeMode: 'cover',
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    height:150,
    width:'100%',
  },
  favorite: {
    color: Colors.yellow,
  },
})

export default ElectionsScreen;
