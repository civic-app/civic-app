import Expo from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import AuthStack from '../src/navigation/AuthStack';
import MainTabNavigator from '../src/navigation/MainTabNavigator';
import SurveyStack from '../src/navigation/SurveyStack';

const NavigationRoot = createSwitchNavigator(
  {
    App: MainTabNavigator,
    Auth: AuthStack,
    Survey: SurveyStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

Expo.registerRootComponent(NavigationRoot);

export default NavigationRoot;
