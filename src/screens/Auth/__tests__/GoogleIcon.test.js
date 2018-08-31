import { createSnapshot } from '../../../util/tests';
import GoogleIcon from '../GoogleIcon';

describe('GoogleIcon', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(GoogleIcon);
    expect(snapshot).toMatchSnapshot();
  });
});
