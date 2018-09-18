import React from 'react';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import {Image, StyleSheet,ScrollView,View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose'
import { Icon } from 'react-native-elements';
import { loadCandidates } from '../../candidate/redux/candidates'
import { Category } from '../../favorites/models';
import {loadFavorites, getIsFavorite } from '../../favorites/redux';
import {getFavoriteCandidateData}  from './ScreenContainer';

class ElectionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Elections',
  };
  goToCandidateDetail = (id) => () => this.props.navigation.navigate('CandidateDetail', { id });
  static propTypes = propTypes;
  render() {
    return (
      <View style={styles.container}>
        <Container goToCandidateDetail={this.goToCandidateDetail}/>
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

const ScreenView = props => (
  <View style={styles.container}>
    <View style={styles.candidateContainer}>
      <View style={styles.informationContainer}>
        <Text style={styles.positionText}>California Governor {'\n'} </Text>
        <Text style={styles.electionText}>November 6, 2018</Text>
      </View>
      <ScrollView horizontal={true}>
        {props.data.map(candidate => (
          <View key={candidate.id} style={styles.container}>
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
                  <Text style={styles.nameText}>{candidate.name}{'\n'}</Text>
                  <Text style={styles.matchCardPercentText}>89%</Text> match
                </Text>
              </View>
            </View>   
          </View>
        )) }
      </ScrollView>
    </View>
  </View>
);

ScreenView.propTypes = {
  goToCandidateDetail: PropTypes.func,
  data: PropTypes.array,
};

const ScreenContainer = props => (
  <View style={styles.container}>
    {props.isFavorite ? 
      <View style={styles.favoriteBody}>
        <Icon
          name={props.isFavorite ? 'star' : null }
          iconStyle={styles.favorite}
          size={15}
        />
        <Text style={styles.favoriteText}> Favorite </Text>
      </View> : null }
  </View>
);
ScreenContainer.propTypes = {
  isFavorite: PropTypes.bool,
};

const Container = compose(
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
)(ScreenView);

const FavoriteScreen = connect(
  (state, ownProps) => ({
    isFavorite: getFavorite(state, ownProps.candidateId),
  }),
)(ScreenContainer);

export const getFavorite = (state,candidateId) => {
  const isFavorite = getIsFavorite(state, candidateId, Category.Candidates);
  return isFavorite
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'flex-start',
    alignItems: 'stretch',
    flexGrow: 1,
    paddingBottom: 15,
  },
  informationContainer: {
    padding:20,
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
  favorite: {
    color: Colors.yellow,
  },
  favoriteText: {
    textAlign: 'center',
    fontSize: 12,
    color:Colors.white,
  },
  favoriteBody: {
    flexDirection: 'row',
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
  matchCardText: {
    textAlign: 'left',
    fontSize: 16,
  },
  matchCardPercentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  contentContainer: {
    marginLeft:15,
  }, 
  candidateContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: 15,
    flex: 1,
    backgroundColor: Colors.white,
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
  pictureBody: {
    marginLeft: 15,
    height: 150,
    width: 200, 
    backgroundColor: Colors.white,
    borderRadius: 2,
    ...Mixins.shadow
  },
  contentBody: {
    padding: 20,
    height: 100,
    width: 200,
    backgroundColor: Colors.white,
    borderRadius: 2,
    ...Mixins.shadow
  },
})

export default ElectionsScreen;
