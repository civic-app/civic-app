import { createStackNavigator } from 'react-navigation';
import ElectionsScreen from '../screens/ElectionsScreen';

import styles from './styles';

const ElectionsStack = createStackNavigator(
  {
    Elections: ElectionsScreen,
  },
  {
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default ElectionsStack;
