import {SAVE_FUEL_SAVINGS, CHANGE_USERNAME, CHANGE_DATA, CHANGE_NEW_USER, SUBMIT_NEW_USER, ADD_CUSTOMER, CHANGE_CUSTOMER_NAME} from '../constants/actionTypes';
import dateHelper from '../utils/dateHelper';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

const copy = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  var temp = obj.constructor(); // give temp the original obj's constructor
  for (var key in obj) {
    temp[key] = copy(obj[key]);
  }

  return temp;
}

export default function globalReducer(state = initialState.appData, action) {
  let newState;
  let change
  let newProducts

  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in appActions.js
      return objectAssign({}, state, {dateModified: dateHelper.getFormattedDateTime(new Date())});

    case CHANGE_USERNAME:
      newState = objectAssign({}, state);
      newState['username'] = action.value;
      return newState;

    case CHANGE_DATA:
      newState = objectAssign({}, state);
      console.log("Changing data")
      change = false
      for (let i = 0; i < newState.newCustomer.products.length; i++) {
        if (newState.newCustomer.products[i].type == action.name) {
          newState.newCustomer.products[i].num = action.value;
          change = true
        }
      }
      if (!change) {
        newState.newCustomer.products.splice(0, 0, {type: action.name, num: action.value})
      }
      return newState;

    case CHANGE_CUSTOMER_NAME:
      newState = objectAssign({}, state)
      newState.newCustomer.name = action.name
      return newState

    case CHANGE_NEW_USER:
      newState = objectAssign({}, state);
      newState.newScout.name = action.name;
      return newState;

    case ADD_CUSTOMER:
      newState = objectAssign({}, state)
      newProducts = copy(newState.newCustomer.products)
      newState.newScout.sales = objectAssign({}, newState.newScout.sales, {[newState.newCustomer.name]: {products: newProducts}})
      newState.newCustomer = initialState.appData.newCustomer
      return newState

    case SUBMIT_NEW_USER:
      newState = objectAssign({}, state);
      newState.scouts = objectAssign({}, newState.scouts, {[newState.newScout.name]: {sales: newState.newScout.sales}})
      newState.newScout = initialState.appData.newScout;
      return newState;

    default:
      return state;
  }
}
