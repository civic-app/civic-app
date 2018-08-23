import { createSnapshot } from '../../../util/tests';
import Banner from '../Banner';

describe('Banner', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(Banner, { title: 'Register to vote!', subtitle: 'Do it!', level: 'high' });
    expect(snapshot).toMatchSnapshot();
  });
});
