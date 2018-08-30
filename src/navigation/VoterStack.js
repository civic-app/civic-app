import { createStackNavigator } from 'react-navigation';

import VoterRegistrationScreen from '../screens/VoterRegistrationScreen';
import VoterRegistrationSuccessScreen from '../screens/VoterRegistrationSuccessScreen';
import TurboVoteScreen from '../screens/TurboVoteScreen';

import styles from './styles';

const VoterStack = createStackNavigator(
    {
        VoterReg: VoterRegistrationScreen,
        VoterRegSuc: VoterRegistrationSuccessScreen,
        TurboVote: TurboVoteScreen,
    },
    {
        navigationOptions: {
            title: 'Register To Vote',
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
        },
    },
);

export default VoterStack;
