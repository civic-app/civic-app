import React from 'react';
import { Provider } from 'react-redux';
import NavigationRoot from './NavigationRoot';
import store from './configureStore';

const CivicApp = () => {
  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
};

export default CivicApp;
