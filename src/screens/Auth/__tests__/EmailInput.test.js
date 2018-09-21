import { createSnapshot } from '../../../util/tests';
import EmailInput from '../EmailInput';

describe('EmailInput', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(EmailInput, {
      value: 'civic@civic.com',
      onChangeText: jest.fn(),
    });
    expect(snapshot).toMatchSnapshot();
  });
  it('renders placeholder text when there is no value', () => {
    const snapshot = createSnapshot(EmailInput, { value: '', onChangeText: jest.fn() });
    expect(snapshot).toMatchSnapshot();
  });
});
