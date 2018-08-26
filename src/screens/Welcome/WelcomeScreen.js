import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';
import WelcomeCarousel from './WelcomeCarousel';
import WelcomePanel from './WelcomePanel';
import { switchFormType } from '../../auth/redux/formReducer';
import { getFormType } from '../../auth/redux/selectors';
import { getIsSmallScreen } from '../../UI/redux';

const civicLogoIcon = require('../../assets/images/civic-logo-white.png');

const WelcomeScreen = props => (
  <View style={styles.container}>
    <Image style={styles.civicLogo} source={civicLogoIcon} />
    <WelcomeCarousel isSmallScreen={props.isSmallScreen} />
    <WelcomePanel
      formType={props.formType}
      switchFormType={props.changeFormType}
      navigate={props.navigation.navigate}
    />
  </View>
);

WelcomeScreen.propTypes = {
  formType: PropTypes.string.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  changeFormType: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
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
  changeFormType: type => dispatch(switchFormType(type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);
