import React from 'react';
import { Provider } from 'react-redux';
import { createSnapshot } from '../../../util/tests';
import DistrictMatch from '../DistrictMatchContainer';
import store from '../../../../App/configureStore';

const DistrictMatchWithStore = () => (
  <Provider store={store}>
    <DistrictMatch/>
  </Provider>
);

describe('DistrictMatch', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(DistrictMatchWithStore);
    expect(snapshot).toMatchSnapshot();
  });
});