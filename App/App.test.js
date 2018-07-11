import App from './index';
import { createSnapshot } from '../src/util/tests';

describe('App', () => {
  it('renders without crashing', () => {
    const snapshot = createSnapshot(App);
    expect(snapshot).toMatchSnapshot();
  });
});
