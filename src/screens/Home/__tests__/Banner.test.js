import { createSnapshot } from '../../../util/tests';
import Banner from '../Banner';
import colors from '../../../styles/colors';

describe('Banner', () => {
  it('renders correctly', () => {
    const props = { title: 'Register to vote!', subtitle: 'Do it!', color: colors.red, icon: 'megaphone' };
    const snapshot = createSnapshot(Banner, props);
    expect(snapshot).toMatchSnapshot();
  });
});
