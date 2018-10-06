// Uncomment to Get Rid of Annoying Yellow Box Dialogs in Android Studio. They are caused by a bug related to Firebase timers.

console.ignoredYellowBox = [
'Setting a timer'
];

import React from 'react';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';
import NavigationRoot from './NavigationRoot';
import store from './configureStore';
import { setIsSmallScreen } from '../src/UI/redux';

if (Dimensions.get('window').height < 600) {
  store.dispatch(setIsSmallScreen());
}

const CivicApp = () => {
  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
};

export default CivicApp;
