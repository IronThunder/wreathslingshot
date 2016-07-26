import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  let firstState = JSON.parse(window.localStorage.getItem('appData')) || initialState

  const store = createStore(rootReducer, {appData: firstState});

  return store;
}
