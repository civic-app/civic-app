import React from 'react';
import { Provider } from 'react-redux';
import { Dimensions } from 'react-native';
import NavigationRoot from './NavigationRoot';
import store from './configureStore';
import { setSmallScreen } from '../src/UI/redux';

if (Dimensions.get('window').height < 600) {
  store.dispatch(setSmallScreen());
}

const CivicApp = () => {
  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
};

export default CivicApp;
