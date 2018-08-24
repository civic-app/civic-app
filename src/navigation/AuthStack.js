import { createStackNavigator } from 'react-navigation';

import CredentialInputScreen from '../screens/Auth/CredentialInputScreenContainer';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';

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
