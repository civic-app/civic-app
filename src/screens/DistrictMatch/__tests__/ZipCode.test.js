import { createSnapshot } from '../../../util/tests';
import { ZipCode } from '../screens';
import { styles } from '../DistrictMatch';

describe('District Match - ZipCode', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(ZipCode, {zipcode:'11238', error:'', styles});
    expect(snapshot).toMatchSnapshot();
  });
});
