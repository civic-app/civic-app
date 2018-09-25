import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import { Icon } from 'react-native-elements';
import {Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const DataContainer = props => {
  return (
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
}
  
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
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent:'space-between',
    alignItems: 'stretch',
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
  

export default DataContainer