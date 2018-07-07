import { createStackNavigator } from 'react-navigation';
import FavoritesScreen from '../screens/FavoritesScreen';

import styles from './styles';

const FavoritesStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
  },
  {
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default FavoritesStack;
