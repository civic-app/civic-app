import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../styles/colors';
import { Icon } from 'react-native-elements';
import {StyleSheet, View, Text } from 'react-native';

const Favorite = props => {
  return (
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
}

Favorite.propTypes = {
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
  favoriteText: {
    textAlign: 'center',
    fontSize: 12,
    color:Colors.white,
  },
  favorite: {
    color: Colors.yellow,
  },
})
    
  
export default Favorite