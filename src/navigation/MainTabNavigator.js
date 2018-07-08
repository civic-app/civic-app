import { createBottomTabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import ElectionsStack from './ElectionsStack';
import FavoritesStack from './FavoritesStack';
import ActivismStack from './ActivismStack';

import colors from '../styles/colors';

/*
 * Create a bottom navigation tab for each of our main screens. Each screen
 * has its own navigation stack (think browser history).
 */
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
