import { createStackNavigator } from 'react-navigation';

import VoterRegistrationScreen from '../screens/VoterRegistrationScreen';

import styles from './styles';

const VoterStack = createStackNavigator(
    {
        VoterRegistration: VoterRegistrationScreen,
    },
    {
        navigationOptions: {
            title: 'Voter Registration',
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
        },
    },
);

export default VoterStack;
