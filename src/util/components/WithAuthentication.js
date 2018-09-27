import React from 'react';
import PropTypes from 'prop-types';

/*
 * @param authAction: either 'login' or 'logout'. 'login' causes the component to
 *    navigate to the main app when the user is logged in. This is meant for the auth
 *    screens to redirect on a successful login.
 *    'logout' navigates to the auth screens when a user is logged out. This is meant to
 *    prevent main app screens from being seen unless the user is logged in.
 *
 * If you do forget to pass the isLoggedIn prop to this component, you run the danger of
 * getting into an infinite redirect because the user never appears to be logged in
 * even if they are.
 */
const WithAuthentication = authAction => WrappedComponent => {
  return class extends React.Component {
    static propTypes = {
      isLoggedIn: PropTypes.bool.isRequired,
      navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
      hasTakenSurvey: PropTypes.bool,
      hasDistrict: PropTypes.bool,
    };

    static defaultProps = {
      hasTakenSurvey: false,
      hasDistrict: false,
    };

    componentDidMount() {
      // navigate away if we're not logged in when this screen first renders
      if (authAction === 'login') {
        this.handleLogin();
      } else if (authAction === 'logout') {
        this.handleLogout();
      }
    }

    componentDidUpdate() {
      // navigate away if we log out from this screen
      if (authAction === 'login') {
        this.handleLogin();
      } else if (authAction === 'logout') {
        this.handleLogout();
      }
    }

    handleLogin = () => {
      if (this.props.isLoggedIn) {
        if (!this.props.hasTakenSurvey) {
          this.props.navigation.navigate('Survey');
        } else if (!this.props.hasDistrict) {
          this.props.navigation.navigate('DistrictMatch');
        } else {
          this.props.navigation.navigate('App');
        }
      }
    };

    handleLogout = () => {
      if (!this.props.isLoggedIn) {
        this.props.navigation.navigate('Auth');
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WithAuthentication;
