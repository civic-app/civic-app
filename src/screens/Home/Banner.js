import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors';

export const mapBannerTypeToColor = bannerType => {
  switch (bannerType) {
    case 'alert':
      return colors.red;
    case 'info':
      return colors.darkBlue;
    // event? what other types do we need
  }
};

const Banner = props => {
  return (
    <View style={[styles.container, props.style, { backgroundColor: mapBannerTypeToColor(props.type) }]}>
      <TouchableHighlight onPress={props.onPress}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>{props.subtitle}</Text>
          <Icon type="entypo" name={props.icon} color={colors.white} size={60} containerStyle={styles.icon} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

Banner.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.any,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    minHeight: 100,
    padding: 16,
    borderRadius: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 8,
  },
  icon: {
    opacity: 0.5,
    position: 'absolute',
    right: 20,
    bottom: -20,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  subtitle: {
    color: colors.white,
    fontSize: 18,
    marginTop: 4,
  },
});

export default Banner;
