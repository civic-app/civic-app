import { createSnapshot } from '../../../util/tests';
import WelcomeCarousel from '../WelcomeCarousel';

describe('WelcomeCarousel', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(WelcomeCarousel, { isSmallScreen: false });
    expect(snapshot).toMatchSnapshot();
  });
  it('does not render pagination in small screen', () => {
    const snapshot = createSnapshot(WelcomeCarousel, { isSmallScreen: true });
    expect(snapshot).toMatchSnapshot();
  });
});
