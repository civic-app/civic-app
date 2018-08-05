import { createStackNavigator } from 'react-navigation';
import SurveyMainScreen from '../screens/Survey';

import styles from './styles';

const SurveyStack = createStackNavigator(
  {
    Main: SurveyMainScreen,
  },
  {
    navigationOptions: {
      title: 'Candidate Match Survey',
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default SurveyStack;
