import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';
import WelcomeCarousel from './WelcomeCarousel';
import WelcomePanel from './WelcomePanel';
import { getFormType, switchFormType as formTypeAction } from '../auth/redux';
import { getIsSmallScreen } from '../UI/redux';

const WelcomeScreen = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.civicLogo} source={require('../assets/images/civic-logo-white.png')} />
      <WelcomeCarousel isSmallScreen={props.isSmallScreen} />
      <WelcomePanel
        formType={props.formType}
        switchFormType={props.switchFormType}
        navigate={props.navigation.navigate}
      />
    </View>
  );
};

WelcomeScreen.propTypes = {
  formType: PropTypes.string,
  isSmallScreen: PropTypes.bool,
  switchFormType: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  civicLogo: {
    height: 65,
    width: 178,
    marginTop: 30,
  },
});

const mapStateToProps = state => ({
  formType: getFormType(state),
  isSmallScreen: getIsSmallScreen(state),
});

const mapDispatchToProps = dispatch => ({
  switchFormType: type => dispatch(formTypeAction(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);
