import { combineReducers } from 'redux';
import appData from './globalReducer';
import customers from './customersDB'
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  appData,
  customers,
  routing: routerReducer
});

export default rootReducer;
