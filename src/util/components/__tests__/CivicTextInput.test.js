import { createSnapshot } from '../../tests';
import CivicTextInput from '../CivicTextInput';

describe('CivicTextInput', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(CivicTextInput);
    expect(snapshot).toMatchSnapshot();
  });
});
