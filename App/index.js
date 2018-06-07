import React from 'react'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { StyleSheet, Text, View } from 'react-native'
import Placeholder from '../src/welcome/WelcomeContainer'
import appReducer from './appReducer';
import appSaga from './appSagas';

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  appReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

sagaMiddleware.run(appSaga)

const App = () => (
  // console.log('store', store) ||
  <Provider store={store}>
    <View style={styles.container}>
      <Placeholder />
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
    </View>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
