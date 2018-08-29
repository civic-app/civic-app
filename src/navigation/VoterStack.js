import { createStackNavigator } from 'react-navigation';

import VoterRegistrationScreen from '../screens/VoterRegistrationScreen';
import VoterRegistrationSuccessScreen from '../screens/VoterRegistrationSuccessScreen';

import styles from './styles';

const VoterStack = createStackNavigator(
    {
        VoterReg: VoterRegistrationScreen,
        VoterRegSuc: VoterRegistrationSuccessScreen,
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
