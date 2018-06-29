import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from '../src/screens';
import store from './configureStore';

registerScreens(store, Provider);

Navigation.startTabBasedApp({});
