import { Navigation } from 'react-native-navigation';

import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';

export const registerScreens = (store, Provider) => {
  Navigation.registerComponent(
    'civic.MainScreen',
    () => MainScreen,
    store,
    Provider,
  );
  Navigation.registerComponent(
    'civic.LoginScreen',
    () => LoginScreen,
    store,
    Provider,
  );
};
