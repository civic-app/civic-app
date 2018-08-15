import { createStackNavigator } from 'react-navigation';

import CredentialInputScreen from '../screens/Auth/CredentialInputScreenContainer';
import WelcomeScreen from '../screens/Welcome/WelcomeScreenContainer';
import VoterRegistrationScreen from '../screens/VoterRegistrationScreen';

const AuthStack = createStackNavigator(
  {
    Credentials: CredentialInputScreen,
    Welcome: WelcomeScreen,
    VoterReg: VoterRegistrationScreen,
  },
  {
    initialRouteName: 'Welcome',
    navigationOptions: { header: null },
  },
);

export default AuthStack;
