import { createSwitchNavigator } from 'react-navigation';

import AuthStack from '../src/navigation/AuthStack';
import MainTabNavigator from '../src/navigation/MainTabNavigator';
import SurveyStack from '../src/navigation/SurveyStack';
import DistrictMatchStack from '../src/navigation/DistrictMatchStack';

/*
 * Combines unrelated flows into one single app. For example,
 * a user who has logged in and sees the survey should not be able
 * to navigate back to the login screen. Eventually, we will use redux
 * state to determine which initial route to show the user.
 */
const NavigationRoot = createSwitchNavigator(
  {
    App: MainTabNavigator,
    Auth: DistrictMatchStack,
    Survey: SurveyStack,
    DistrictMatch: DistrictMatchStack
  },
  {
    //Default Stack is Auth
    initialRouteName: 'Auth',
  },
);

export default NavigationRoot;
