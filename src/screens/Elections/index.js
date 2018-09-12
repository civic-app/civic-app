import React from 'react';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import PropTypes from 'prop-types';
import {Image, StyleSheet,ScrollView,View, Text, TouchableOpacity,Dimensions } from 'react-native';
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

const {width, height} = Dimensions.get('window');

const ScreenView = props => (
  <View style={styles.container}>
    <Text>California</Text>
    <ScrollView horizontal={true}>
      {props.data.map(candidate => (
        <View key={candidate.id} style={styles.candidateBody}>
          <View  style={styles.pictureBody}>
          <TouchableOpacity onPress={props.goToCandidateDetail(candidate.id)}> 
            <Image style={{
            resizeMode: 'cover',
            position:'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom:0,
            height:150,
            width:'100%'
   
            }}
              source={{ uri: candidate.image}} 
              />
              <FavoriteScreen candidateId={candidate.id}/>
            </TouchableOpacity>
          </View>
          
          <View style={styles.contentBody}>
            <Text style={styles.matchCardText}>
              <Text style={styles.nameText}>{candidate.name}{'\n'}</Text>
              <Text style={styles.matchCardPercentText}>89%</Text> match
            </Text>

          </View>
          
        </View>
      )) }
    </ScrollView>
  </View>



);

ScreenView.propTypes = {
  goToCandidateDetail: PropTypes.func,
  data: PropTypes.array,
};

const ScreenContainer = props => (
  <View style={styles.container}>
    <Icon
      name={props.isFavorite ? 'star' : 'star-border'}
      iconStyle={styles.favorite}
      size={40}
    />
  </View>
);

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
    alignItems: 'flex-start',
    paddingBottom: 15
  },
  nameText: {
    fontSize: 18,
  },
  favorite: {
    color: Colors.orange,
    position: 'absolute',
    left: 10,
    top: 0,
  },
  matchCardText: {
    textAlign: 'center',
    fontSize: 16,
  },
  matchCardPercentText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  contentBody:{
    flexGrow: 1,
    alignItems:'center',
    justifyContent:'center',
    height:100,
    flexDirection: 'column',
    backgroundColor: Colors.white
  },
  candidateBody:{
    marginLeft:10,
    flex:1,
    height: 150,
    width: 200, 
    backgroundColor: Colors.white
  },
  pictureBody:{
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
})

export default ElectionsScreen;
