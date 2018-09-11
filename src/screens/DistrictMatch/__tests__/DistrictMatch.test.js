import { createSnapshot } from '../../../util/tests';
import DistrictMatch from '../DistrictMatch';

describe('DistrictMatch', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(DistrictMatch);
    expect(snapshot).toMatchSnapshot();
  });
});
