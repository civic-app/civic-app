import Expo from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import AuthStack from '../src/navigation/AuthStack';
import MainTabNavigator from '../src/navigation/MainTabNavigator';

const NavigationRoot = createSwitchNavigator(
  {
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

Expo.registerRootComponent(NavigationRoot);

export default NavigationRoot;
