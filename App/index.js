import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from '../src/screens';
import store from './configureStore';
import colors from '../src/styles/colors';

registerScreens(store, Provider);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Home',
      screen: 'civic.HomeScreen',
      icon: '',
      iconInsets: {},
      title: 'Home',
    },
    {
      label: 'Elections',
      screen: 'civic.ElectionsScreen',
      icon: '',
      iconInsets: {},
      title: 'Elections',
    },
    {
      label: 'Favorites',
      screen: 'civic.FavoritesScreen',
      icon: '',
      iconInsets: {},
      title: 'Favorites',
    },
    {
      label: 'Activism',
      screen: 'civic.ActivismScreen',
      icon: '',
      iconInsets: {},
      title: 'Activism',
    },
  ],
  tabsStyle: {
    // add these properties here for ios
    tabBarButtonColor: colors.lightGray,
    tabBarSelectedButtonColor: colors.orange,
    tabBarBackgroundColor: colors.white,
  },
  appStyle: {
    // add these properties here for android
    tabBarButtonColor: colors.lightGray,
    tabBarSelectedButtonColor: colors.orange,
    tabBarBackgroundColor: colors.white,
  },
  drawer: {
    left: {
      screen: 'civic.NavigationDrawer',
    },
    style: {
      drawerShadow: true,
      contentOverlayColor: 'rgba(0,0,0,0.25)',
    },
  },
});
