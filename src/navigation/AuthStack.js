import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default AuthStack;
