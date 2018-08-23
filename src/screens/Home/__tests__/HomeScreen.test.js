import { createSnapshot } from '../../../util/tests';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(HomeScreen);
    expect(snapshot).toMatchSnapshot();
  });
});
