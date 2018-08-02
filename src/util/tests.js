import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Provider } from 'react-redux';
import store from '../../App/configureStore';

export const createSnapshot = (Component, props) => {
  const renderer = new ShallowRenderer();
  renderer.render(<Component {...props} />);
  return renderer.getRenderOutput();
};

export const createConnectedSnapshot = (Component, props) => {
  const renderer = new ShallowRenderer();
  renderer.render(<Provider store={store}><Component {...props} /></Provider>);
  return renderer.getRenderOutput();
};
