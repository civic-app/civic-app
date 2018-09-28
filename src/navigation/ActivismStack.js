import { createStackNavigator } from 'react-navigation';
import ActivismScreen from '../screens/Activism';

import styles from './styles';

const ActivismStack = createStackNavigator(
  {
    Activism: ActivismScreen,
  },
  {
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default ActivismStack;
