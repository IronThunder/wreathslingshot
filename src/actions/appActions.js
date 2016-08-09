import * as types from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';

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

export function getScoutInfo (name) {
  return {type: types.GET_SCOUT_INFO, name}
}

export function changeCustomerProperty (name, value) {
  return {type: types.CHANGE_CUSTOMER_PROPERTY, name, value}
}

/////////////////Asynchronous Customer Actions//////////////////////////////////

export function requestCustomers (ids) {
  return {type: types.REQUEST_CUSTOMERS, ids}
}

export function receiveCustomers (json) {
  return {
    type: types.RECEIVE_CUSTOMERS,
    customers: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchCustomers (ids) {
  return dispatch => {
    dispatch(requestCustomers(ids))
    return fetch(`powerful-sea-27631.herokuapp.com/customers/subset?ids=${ids.map(id => ('' + id + ','))}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCustomers(json)))
  }
}

function shouldFetchCustomers (state, ids) {
  const customers = state.customers
  let result = false
  for (let i = 0; i < ids.length; i++) {
    let found = true
    customers.map(cust => {found = (cust.id === ids[i])})
    result = !found
  }
}

export function fetchCustomersIfNeeded (ids) {
  return (dispatch, getState) => {
    if (shouldFetchCustomers(getState(), ids)) {
      return dispatch(fetchCustomers(ids))
    }
  }
}

/////////////////Asynchronous Scout Actions//////////////////////////////////

export function requestScout (id) {
  return {type: types.REQUEST_SCOUT, id}
}

export function receiveScout (json) {
  return {
    type: types.RECEIVE_SCOUT,
    scout: json.data.children.map(child => child.data)[0],
    receivedAt: Date.now()
  }
}

export function fetchScout (id) {
  return dispatch => {
    dispatch(requestScout(id))
    return fetch(`powerful-sea-27631.herokuapp.com/customers/subset?ids=${ids}`)
      .then(response => response.json())
      .then(json => dispatch(receiveScout(json)))
  }
}

function shouldFetchScout (state, id) {
  const scout = state.scoutList[id]
  return !scout

}

export function fetchScoutIfNeeded (id) {
  return (dispatch, getState) => {
    if (shouldFetchScout(getState(), id)) {
      return dispatch(fetchScout(id))
    }
  }
}

/////////////////Asynchronous Sheet Actions//////////////////////////////////

export function requestSalesheets (scoutId, year) {
  return {type: types.REQUEST_SALESHEETS, scoutId, year}
}

export function receiveSalesheets (json) {
  return {
    type: types.RECEIVE_SALESHEETS,
    sheets: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchSalesheets (scoutId, year) {
  return dispatch => {
    dispatch(requestSalesheets(scoutId, year))
    return fetch(`powerful-sea-27631.herokuapp.com/customers/subset?scoutId=${scoutId},year=${year}`)
      .then(response => response.json())
      .then(json => dispatch(receiveScout(json)))
  }
}

function shouldFetchScout (state, id) {
  const scout = state.scoutList[id]
  return !scout

}

export function fetchScoutIfNeeded (id) {
  return (dispatch, getState) => {
    if (shouldFetchScout(getState(), id)) {
      return dispatch(fetchScout(id))
    }
  }
}
