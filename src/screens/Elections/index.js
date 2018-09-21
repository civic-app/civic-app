import React from 'react';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import {Image, StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose'
import { Icon } from 'react-native-elements';
import { loadCandidates } from '../../candidate/redux/candidates'
import { loadFavorites } from '../../favorites/redux';
import { getFavoriteCandidateData, getFavorite }  from './ScreenContainer';

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });
  static propTypes = propTypes;
  render() {
    return (
      <View style={styles.container}>
        <Elections goToCandidateDetail={this.goToCandidateDetail}/>
      </View>
    );
  }
}

const propTypes = {
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

const new_set = new Set()
const ElectionView = props => (
  <View style={styles.container}>
    {/*removing duplicates by using set*/}
    {props.data.map(candidate => (
      new_set.add(candidate.electionIds[0])
    ))}
    <FlatList
      data={[...new_set]}
      keyExtractor={(item)=>item}
      renderItem={({item})=> (
        <View key={item} style={styles.candidateContainer}>
          <View style={styles.informationContainer}>
            <Text style={styles.positionText}>{item} </Text>
            <Text style={styles.electionText}>November 6, 2018</Text>
          </View>
          <ScrollView horizontal={true}>
            {props.data.map(candidate => (
              (item === candidate.electionIds.toString()) 
                ?  
                <View key={candidate.id} style={styles.container}>
                  <View style={styles.newsCard}>
                    <View style={styles.pictureBody}>
                      <TouchableOpacity onPress={props.goToCandidateDetail(candidate.id)}> 
                        <Image style={styles.candidatePicture}
                          source={{ uri: candidate.image}} 
                        />
                        <FavoriteScreen candidateId={candidate.id}/>
                      </TouchableOpacity>
                    </View> 
                    <View style={styles.contentContainer}>
                      <View style={styles.contentBody}>
                        <Text style={styles.matchCardText}>
                          <Text style={styles.nameText}>{candidate.name}{'\n\n'}</Text>
                          <Text style={styles.matchCardPercentText}>89%</Text> match
                        </Text>
                      </View>
                    </View>   
                  </View> 
                </View>
                :
                null
            ))}
          </ScrollView>
        </View>
      )}
    />
  </View>
);

ElectionView.propTypes = {
  goToCandidateDetail: PropTypes.func,
  data: PropTypes.array,
  name: PropTypes.string,
  electionIds: PropTypes.string,
  imageURI: PropTypes.string,
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
        <Text style={styles.favoriteText}> Favorite </Text>
      </View> 
      :
      null }
  </View>
);
FavoriteContainer.propTypes = {
  isFavorite: PropTypes.bool,
};

const Elections = compose(
  connect(
    (state) => ({
      data: getFavoriteCandidateData(state),
    }),
    {loadCandidates,loadFavorites}
  ),  
  lifecycle({
    componentDidMount() {
      this.props.loadCandidates();
      this.props.loadFavorites();
    }
  })
)(ElectionView);

const FavoriteScreen = connect(
  (state, ownProps) => ({
    isFavorite: getFavorite(state, ownProps.candidateId),
  }),
)(FavoriteContainer);

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
