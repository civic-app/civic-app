import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';
import Mixins from '../../styles/mixins';
import {Image, StyleSheet, View, Text } from 'react-native';
import Fave from './FavoriteContainer'

const DataContainer = props => {
  return (
    <View style={styles.container}>
      <View key={props.data.id} style={styles.container}>
        <View style={styles.newsCard}>
          <View style={styles.pictureBody}>
            <Image style={styles.candidatePicture}
              source={{ uri: props.data.image}} 
            />
            <Fave isFavorite={props.data.isFavorite}/>
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
  nameText: {
    fontSize: 18,
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
})
  

export default DataContainer