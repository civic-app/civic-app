import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Welcome: WelcomeScreen,
  },
  {
    initialRouteName: 'Welcome',
    navigationOptions: {
      header: null,
    },
  },
);

export default AuthStack;
