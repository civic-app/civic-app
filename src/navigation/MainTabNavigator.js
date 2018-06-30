import { createBottomTabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import ElectionsStack from './ElectionsStack';
import FavoritesStack from './FavoritesStack';
import ActivismStack from './ActivismStack';

import colors from '../styles/colors';

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Elections: ElectionsStack,
    Favorites: FavoritesStack,
    Activism: ActivismStack,
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: colors.orange,
    },
  },
);

export default MainTabNavigator;
