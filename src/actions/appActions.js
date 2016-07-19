import * as types from '../constants/actionTypes';

export function saveFuelSavings(settings) {
  return {type: types.SAVE_FUEL_SAVINGS, settings};
}

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
