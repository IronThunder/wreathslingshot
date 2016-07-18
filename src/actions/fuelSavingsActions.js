import * as types from '../constants/actionTypes';

export function saveFuelSavings(settings) {
  return {type: types.SAVE_FUEL_SAVINGS, settings};
}

export function calculateFuelSavings(settings, fieldName, value) {
  return {type: types.CHANGE_USERNAME, settings, fieldName, value};
}
