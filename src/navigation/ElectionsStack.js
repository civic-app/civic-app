import { createStackNavigator } from 'react-navigation';
import ElectionsScreen from '../screens/Elections';
import CandidateDetailScreen from '../screens/CandidateDetail';
import ContentScreen from '../screens/CandidateDetail/TabBar/WebContent';

import styles from './styles';
import colors from '../styles/colors';

const ElectionsStack = createStackNavigator(
  {
    Elections: ElectionsScreen,
    CandidateDetail: CandidateDetailScreen,
    Content: ContentScreen, 
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
