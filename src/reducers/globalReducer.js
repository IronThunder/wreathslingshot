import {
  CHANGE_USERNAME,
  CHANGE_DATA,
  CHANGE_NEW_USER,
  SUBMIT_NEW_USER,
  ADD_CUSTOMER,
  CHANGE_CUSTOMER_NAME,
  REMOVE_CUSTOMER,
  CHANGE_STATIC_CUSTOMER_DATA,
  ADD_NEW_STATIC_CUSTOMER,
  GET_SCOUT_INFO,
  CHANGE_CUSTOMER_PROPERTY
} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import helperFunctions from '../utils/helperFunctions'

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

const remove = (array, key) => {
  let newArray = helperFunctions.copy(array)
  for (let i = 0; i < newArray.length; i++){
    if (newArray[i]['Customer Name'] === key){
      newArray.splice(i, 1)
    }
  }
  return newArray
}


export default function globalReducer(state = helperFunctions.copy(initialState.appData), action) {
  let newState;
  let change
  let newProducts
  let newProperties

  switch (action.type) {
    //Reducers for viewing scouts
    case CHANGE_USERNAME:
      newState = objectAssign({}, state);
      newState['username'] = action.value;
      return newState;

    //-------------------------------------------------------
    //-------------------------------------------------------
    //Reducers for changing or adding scouts
    case CHANGE_DATA:
      newState = objectAssign({}, state);
      change = false
      for (let i = 0; i < newState.newCustomer.products.length; i++) {
        if (newState.newCustomer.products[i].type == action.name) {
          newState.newCustomer.products[i].num = parseInt(action.value);
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
      if (newState.scouts[newState.newScout.name] !== undefined){
        newState.visible = 'visible'
      }
      else {
        newState.visible = 'hidden'
      }
      return newState;

    case ADD_CUSTOMER:
      newState = objectAssign({}, state)
      newProducts = helperFunctions.copy(newState.newCustomer.products)
      newProperties = helperFunctions.copy(newState.newCustomer.properties)
      newState.newScout.sales = objectAssign({}, newState.newScout.sales, {['' + newState.newCustomer.name]: {products: newProducts, properties: newProperties}})
      newState.newCustomer = helperFunctions.copy(initialState.appData.newCustomer)
      newState.newCustomer.products = helperFunctions.generateInitialProducts(Object.keys(newState.types))
      return newState

    case REMOVE_CUSTOMER:
      newState = objectAssign({}, state)
      delete newState.newScout.sales[action.key]
      return newState

    case SUBMIT_NEW_USER:
      newState = objectAssign({}, state);
      newState.scouts = objectAssign({}, newState.scouts, {['' + newState.newScout.name]: {sales: helperFunctions.copy(newState.newScout.sales)}})
      newState.newScout = helperFunctions.copy(initialState.appData.newScout);
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState;

    case CHANGE_CUSTOMER_PROPERTY:
      newState = objectAssign({}, state);
      newState.newCustomer.properties[action.name] = action.value
      return newState

    //-------------------------------------------------------
    //-------------------------------------------------------
    //Reducers for changing or adding customers
    case CHANGE_STATIC_CUSTOMER_DATA:
      newState = objectAssign({}, state)
      newState.newStaticCustomer[action.key] = action.name
      return newState

    case ADD_NEW_STATIC_CUSTOMER:
      newState = objectAssign({}, state)
      newState.customers = remove(newState.customers, newState.newStaticCustomer['Customer Name'])
      newState.customers.splice(0, 0, objectAssign({}, newState.newStaticCustomer))
      newState.newStaticCustomer = helperFunctions.copy(initialState.appData.newStaticCustomer)
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case GET_SCOUT_INFO:
      newState = objectAssign({}, state)
      newState.newScout = objectAssign({}, newState.scouts[action.name], {name: action.name}) || helperFunctions.copy(initialState.appData.newScout)
      return newState

    default:
      return state;
  }
}
