import { createSnapshot } from '../../../util/tests';
import PasswordInput from '../PasswordInput';

describe('PasswordInput', () => {
  it('renders correctly', () => {
    const snapshot = createSnapshot(PasswordInput, {
      value: 'pa$$word',
      onChangeText: jest.fn(),
    });
    expect(snapshot).toMatchSnapshot();
  });
  it('renders placeholder text when there is no value', () => {
    const snapshot = createSnapshot(PasswordInput, { value: '', onChangeText: jest.fn() });
    expect(snapshot).toMatchSnapshot();
  });
  it('renders passed placeholder text', () => {
    const snapshot = createSnapshot(PasswordInput, {
      value: '',
      placeholder: 'Re-enter password',
      onChangeText: jest.fn(),
    });
    expect(snapshot).toMatchSnapshot();
  });
});
