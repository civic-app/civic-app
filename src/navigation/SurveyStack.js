import { createStackNavigator } from 'react-navigation';
import React from 'react';
import SurveyMainScreen from '../screens/Survey/redux/containers/Container_SurveyMainScreen';

import styles from './styles';

const SurveyStack = createStackNavigator(
  {
    Main: {
      screen: SurveyMainScreen
    },
  },
  {
    navigationOptions: {
      title: 'Candidate Match Survey',
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
    },
  },
);

export default SurveyStack;
