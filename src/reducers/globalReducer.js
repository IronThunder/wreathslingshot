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
  CHANGE_CUSTOMER_PROPERTY,
  RECEIVE_CUSTOMERS,
  REQUEST_CUSTOMER_POST,
  CUSTOMER_POST_RESULT,
  RESET_NEW_STATIC_CUSTOMER,
  CHANGE_YEAR,
  RECEIVE_SCOUT,
  RECEIVE_SALESHEETS,
  REQUEST_SCOUT_POST,
  SCOUT_POST_RESULT,
  REQUEST_SHEET_POST,
  SHEET_POST_RESULT,
  ADD_LEAD,
  REQUEST_LEAD_POST,
  LEAD_POST_RESULT,
  CHANGE_SHEET_ENTRY,
  POPULATE_A0_USER,
  CHANGE_A0_USER
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
  let newState
  let change
  let newProducts
  let newProperties
  let id
  let products
  let year; let date

  switch (action.type) {
    case CHANGE_USERNAME:
      newState = objectAssign({}, state);
      newState['username'] = action.value;
      return newState;

    case CHANGE_YEAR:
      newState = objectAssign({}, state);
      newState['year'] = action.value;
      if (helperFunctions.validateSheet(newState, newState.newScout.name, newState.year)){
        newState.visible = 'visible'
      }
      else {
        newState.visible = 'hidden'
      }
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

    case CHANGE_SHEET_ENTRY:
      newState = objectAssign({}, state)
      products = newState.newScout.sales[action.custName].products
      if (products)
        products = helperFunctions.updateProduct(products, action.key, action.value)
      return newState

    case CHANGE_CUSTOMER_NAME:
      newState = objectAssign({}, state)
      newState.newCustomer.name = action.name
      return newState

    case CHANGE_NEW_USER:
      newState = objectAssign({}, state);
      newState.newScout.name = action.name;
      id = helperFunctions.findCurrentSheetID(newState, action.name, newState.year)
      if (newState.sheets[id] !== undefined){
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
      id = helperFunctions.generateSheetID(newState)
      date = newState.year
      newState.sheets = objectAssign({}, newState.sheets, {[id]: {sales: helperFunctions.copy(newState.newScout.sales)}})
      newState.scoutList.splice(0, 0, {name: newState.newScout.name, id: helperFunctions.generateScoutID(newState), years: {['' + year]: id}})
      newState.newScout = helperFunctions.copy(initialState.appData.newScout);
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState;

    case CHANGE_CUSTOMER_PROPERTY:
      newState = objectAssign({}, state);
      newState.newCustomer.properties[action.name] = action.value
      return newState

    case RECEIVE_SCOUT:
      newState = objectAssign({}, state)
      let newScouts = action.scouts.map(scout => (objectAssign({}, scout, {name: helperFunctions.decodeStr(scout.name)})))
      newState.scoutList = newScouts
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case REQUEST_SCOUT_POST:
      newState = objectAssign({}, state)
      newState.scoutPost.isWaiting = true
      return newState

    case SCOUT_POST_RESULT:
      newState = objectAssign({}, state)
      newState.scoutPost.isWaiting = false
      if (!action.success) {
        console.error('Error posting scout; no scout posted.', action.error)
      }
      return newState

    case ADD_LEAD:
      newState = objectAssign({}, state)
      newState.scoutList = helperFunctions.updateScoutArray(newState, action.scoutID, 'customerIDs', action.custID)
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case REQUEST_LEAD_POST:
      newState = objectAssign({}, state)
      newState.scoutPost.requestingLeads = true
      return newState

    case LEAD_POST_RESULT:
      newState = objectAssign({}, state)
      newState.scoutPost.requestingLeads = false
      if (!action.success) {
        console.error('Error updating scout leads; no lead added.', action.error)
      }
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
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case RESET_NEW_STATIC_CUSTOMER:
      newState = objectAssign({}, state)
      newState.newStaticCustomer = helperFunctions.copy(initialState.appData.newStaticCustomer)
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case RECEIVE_CUSTOMERS:
      newState = objectAssign({}, state)
      newState.customers = action.customers
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case REQUEST_CUSTOMER_POST:
      newState = objectAssign({}, state)
      newState.customerPost.isWaiting = true
      return newState

    case CUSTOMER_POST_RESULT:
      newState = objectAssign({}, state)
      newState.customerPost.isWaiting = false
      if (!action.success) {
        console.error('Error posting customer; no customer posted.', action.error)
      }
      return newState

    case GET_SCOUT_INFO:
      newState = objectAssign({}, state)
      id = helperFunctions.findCurrentSheetID(newState, action.name, newState.year)
      newState.newScout = objectAssign({}, newState.sheets[id], {name: action.name}) || helperFunctions.copy(initialState.appData.newScout)
      return newState

    //-------------------------------------------------------
    //-------------------------------------------------------
    //Reducers for changing or adding salesheets

    case RECEIVE_SALESHEETS:
      newState = objectAssign({}, state)
      newState.sheets = helperFunctions.postParseSheets(action.sheets)
      window.localStorage.setItem('appData', JSON.stringify(newState))
      return newState

    case REQUEST_SHEET_POST:
      newState = objectAssign({}, state)
      newState.sheetPost.isWaiting = true
      return newState

    case SHEET_POST_RESULT:
      newState = objectAssign({}, state)
      newState.sheetPost.isWaiting = false
      if (!action.success) {
        console.error('Error posting salesheet; no sheet posted.', action.error)
      }
      return newState

    //-------------------------------------------------------
    //-------------------------------------------------------
    //Reducers for authentication

    case POPULATE_A0_USER:
      newState = objectAssign({}, state)
      newState.newUserData = action.user
      return newState

    case CHANGE_A0_USER:
      newState = objectAssign({}, state)
      if (newState.newUserData[action.field]) {
        newState.newUserData[action.field] = action.val
      }
      return newState

    default:
      return state;
  }
}
