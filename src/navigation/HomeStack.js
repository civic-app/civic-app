import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';

import styles from './styles';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default HomeStack;
