import * as types from '../constants/actionTypes';

export function calculateFuelSavings(settings, fieldName, value) {
  return {type: types.CHANGE_USERNAME, settings, fieldName, value};
}

export function changeData(name, value) {
  return {type: types.CHANGE_DATA, name, value};
}

export function changeNewUser(name) {
  return {type: types.CHANGE_NEW_USER, name};
}

export function submitNewScout() {
  return {type: types.SUBMIT_NEW_USER}
}

export function addCustomer() {
  return {type: types.ADD_CUSTOMER}
}

export function changeNewCustomer(name) {
  return {type: types.CHANGE_CUSTOMER_NAME, name}
}

export function removeCustomer(key) {
  return {type: types.REMOVE_CUSTOMER, key}
}

export function changeStaticCustomerData(key, name) {
  return {type: types.CHANGE_STATIC_CUSTOMER_DATA, key, name}
}

export function addNewStaticCustomer() {
  return {type: types.ADD_NEW_STATIC_CUSTOMER}
}
