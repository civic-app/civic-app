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

const new_set = new Set()
const ScreenView = props => (
  <View style={styles.container}>
    {props.data.map(candidate => (
      new_set.add(candidate.electionIds[0])
    ))}
    {[...new_set].map((val1) => (
      <View key={val1} style={styles.candidateContainer}>
        <View style={styles.informationContainer}>
          <Text style={styles.positionText}>{val1} </Text>
          <Text style={styles.electionText}>November 6, 2018</Text>
        </View>
        <ScrollView horizontal={true}>
          {props.data.map(candidate => (
            (val1 === candidate.electionIds.toString()) 
              ?  
              <View key={candidate.id} style={styles.secondContainer}>
                <View style={styles.pictureBody}>
                  <View style={styles.newsCard}>
                    <Image style={styles.candidatePicture}
                      source={{ uri: candidate.image}} 
                    />
                  </View> 

                </View>   
              </View>  

              : null
          ))}
        </ScrollView>
      </View>
    ))}
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
          name={'star'}
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
    flexGrow: 1,
    justifyContent:'space-between',
    alignItems: 'stretch',
    paddingBottom: 15,
    backgroundColor: Colors.lightGray2
  },
  secondContainer: {
    height: 300,
    paddingBottom: 300,
    backgroundColor: Colors.white
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
    // flexDirection: 'column',
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
