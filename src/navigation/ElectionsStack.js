import { createStackNavigator } from 'react-navigation';
import ElectionsScreen from '../screens/ElectionsScreen';
import CandidateDetailScreen from '../screens/CandidateDetailScreen';

import styles from './styles';
import colors from '../styles/colors';

const ElectionsStack = createStackNavigator(
  {
    Elections: ElectionsScreen,
    CandidateDetail: CandidateDetailScreen,
  },
  {
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
      headerTintColor: colors.white,
      headerBackTitle: null,
    },
  },
);

export default ElectionsStack;
