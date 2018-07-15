import { createStackNavigator } from 'react-navigation';

import CredentialInputScreen from '../screens/CredentialInputScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';

const AuthStack = createStackNavigator(
  {
    Credentials: CredentialInputScreen,
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
