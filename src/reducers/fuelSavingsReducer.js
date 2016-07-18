import {SAVE_FUEL_SAVINGS, CHANGE_USERNAME} from '../constants/actionTypes';
import calculator from '../utils/fuelSavingsCalculator';
import dateHelper from '../utils/dateHelper';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function fuelSavingsReducer(state = initialState.fuelSavings, action) {
  let newState;

  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {dateModified: dateHelper.getFormattedDateTime(new Date())});

    case CHANGE_USERNAME:
      newState = objectAssign({}, state);
      newState['username'] = action.value;
      return newState;

    default:
      return state;
  }
}
