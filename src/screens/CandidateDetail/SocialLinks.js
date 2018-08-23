import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const SocialLinks = ({facebook, email, phone, twitter, color, size}) =>
  /**
   * Social Links > About Tab > CandidateDetail
   *  { facebook, email, phone, twitter } - URL Strings
   *  { color } - Color for icons & Text
   *  { size } - Must Be Type Number
   */

  <View style={styles.container}>
    <View>
      <Icon
        name='phone'
        color={color}
        size={size}
      />
      <Text style={[styles.text, {color}]}>CALL</Text>
    </View>
    <View>
      <Icon
        name='email'
        color={color}
        size={size}
      />
      <Text style={[styles.text, {color}]}>EMAIL</Text>
    </View>
    <View>
      <Icon
        name='twitter'
        type='material-community'
        color={color}
        size={size}
      />
      <Text style={[styles.text, {color}]}>TWITTER</Text>
    </View>
    <View>
      <Icon
        name='facebook'
        type='material-community'
        color={color}
        size={size}
      />
      <Text style={[styles.text, {color}]}>FACEBOOK</Text>
    </View>
  </View>

SocialLinks.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontWeight:'bold'
  }
});

export default SocialLinks;
