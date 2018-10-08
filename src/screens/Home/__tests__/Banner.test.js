import { createSnapshot } from '../../../util/tests';
import Banner from '../Banner';

describe('Banner', () => {
  it('renders correctly', () => {
    const props = { title: 'Register to vote!', subtitle: 'Do it!', type: 'alert', icon: 'megaphone' };
    const snapshot = createSnapshot(Banner, props);
    expect(snapshot).toMatchSnapshot();
  });
});
