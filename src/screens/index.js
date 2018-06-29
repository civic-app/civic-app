import { Navigation } from 'react-native-navigation';
import ActivismScreen from './ActivismScreen';
import ElectionsScreen from './ElectionsScreen';
import FavoritesScreen from './FavoritesScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import NavigationDrawer from './NavigationDrawer';

export const registerScreens = (store, Provider) => {
  Navigation.registerComponent(
    'civic.ActivismScreen',
    () => ActivismScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'civic.ElectionsScreen',
    () => ElectionsScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'civic.FavoritesScreen',
    () => FavoritesScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'civic.HomeScreen',
    () => HomeScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'civic.LoginScreen',
    () => LoginScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'civic.NavigationDrawer',
    () => NavigationDrawer,
    store,
    Provider,
  );
};
