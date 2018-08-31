import mockFirebase from '../src/firebase/doubles';

jest.mock('firebase', () => mockFirebase);
