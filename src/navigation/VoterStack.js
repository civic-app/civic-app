import { createStackNavigator } from 'react-navigation';

import VoterRegistrationScreen from '../screens/VoterRegistrationScreen';
import VoterRegistrationSuccessScreen from '../screens/VoterRegistrationSuccessScreen';
import TurboVoteScreen from '../screens/TurboVoteScreen';

import styles from './styles';
import colors from '../styles/colors';

const VoterStack = createStackNavigator(
  {
    VoterReg: VoterRegistrationScreen,
    VoterRegSuc: VoterRegistrationSuccessScreen,
    TurboVote: TurboVoteScreen,
  },
  {
    initialRouteName: 'VoterReg',
    navigationOptions: {
      title: 'Register To Vote',
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
      headerTintColor: colors.white,
    },
  },
);

export default VoterStack;
