import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
// import HomeStack from './HomeStack';
import ElectionsStack from './ElectionsStack';
import FavoritesStack from './FavoritesStack';
import ActivismStack from './ActivismStack';
import TabBarIcon from './TabBarIcon';
import colors from '../styles/colors';

/*
 * Create a bottom navigation tab for each of our main screens. Each screen
 * has its own navigation stack (think browser history).
 */
const MainTabNavigator = createBottomTabNavigator(
  {
    // TODO: Implement stuff to show on home screen
    // Home: HomeStack,
    Elections: ElectionsStack,
    Favorites: FavoritesStack,
    Activism: ActivismStack,
  },
  {
    // initialRouteName: 'Home',
    initialRouteName: 'Elections',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: props => <TabBarIcon navigation={navigation} {...props} />,
    }),
    tabBarOptions: {
      activeTintColor: colors.orange,
      labelStyle: {
        fontSize: 14,
      },
      style: {
        paddingTop: 5,
      },
    },
  },
);

export default MainTabNavigator;
