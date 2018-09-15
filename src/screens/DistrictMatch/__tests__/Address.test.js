import { createSnapshot } from '../../../util/tests';
import { Address } from '../screens';
import { styles } from '../DistrictMatch';

describe('District Match - Address', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(Address, {address:'1234 Merry Lane', error:'', city:'Baltimore', styles});
    expect(snapshot).toMatchSnapshot();
  });
});
