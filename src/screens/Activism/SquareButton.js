/**
 * This component is not being used at the moment
 * But once the Activism screen has more options
 * this should match the original UI mockup so I'm
 * leaving it in for now...
 */

import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import mixins from '../../styles/mixins';

const SquareButton = ({text, handlePress}) => (
  <TouchableHighlight
    style={styles.touchable}
    activeOpacity={0.8}
    underlayColor="transparent"
    onPress={handlePress}
  >
    <View style={styles.wrapper}>
      <Icon
        name="megaphone"
        containerStyle={styles.iconContainer}
        iconStyle={styles.iconStyle}
        size={160}
        type="entypo"
        color="white"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableHighlight>
);

SquareButton.propTypes = {
  text: PropTypes.string,
  handlePress: PropTypes.func
}

const btnSize = 190;
const styles = StyleSheet.create({
  touchable: {
    width: btnSize,
    height: btnSize
  },
  wrapper: {
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: colors.lightBlue,
    marginBottom:10,
    marginTop:10,
    width: btnSize,
    height: btnSize
  },
  iconContainer: {
    position: 'absolute',
    top: -20,
    right: 10
  },
  iconStyle: {
    opacity: 0.3
  },
  text: {
    fontSize: 24,
    color:"white",
    paddingBottom:5
  }
})

export default SquareButton;
