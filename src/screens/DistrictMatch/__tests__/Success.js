import { createSnapshot } from '../../../util/tests';
import { Success } from '../screens';

describe('District Match - Success Screen', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(Success, {district:'WA-03'});
    expect(snapshot).toMatchSnapshot();
  });
});
