/**
 * Created by Duncan on 8/10/2016.
 */
import * as types from '../constants/actionTypes'
import * as actions from '../actions/appActions'
import fetch from 'isomorphic-fetch'
import helperFunctions from '../utils/helperFunctions'
import { jwt, url } from '../constants/env'

export const postCustomer = store => next => action => {
  if (action.type === types.ADD_NEW_STATIC_CUSTOMER) {
    let result = next(action)
    let form = {}
    store.getState().appData.customerFields.map(field => {
      form = Object.assign({}, form, {[field]: store.getState().appData.newStaticCustomer[field]})
    })
    fetch(url + `/customers`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(json => store.dispatch(actions.requestCustomerPost()))
      .then(response => {
          if (response.status >= 400){
            store.dispatch(actions.customerPostResult(false, new Error("Bad response from server")))
          } else {
            store.dispatch(actions.customerPostResult(true, null))
            fetch(url + `/customers`, {headers: {'Authorization': 'JWT ' + jwt}})
              .then(response => response.json())
              .then(json => store.dispatch(actions.receiveCustomers(json)))
          }
          store.dispatch(actions.resetNewCustomer())
        }
      )


    return result
  } else {
    return next(action)
  }
}

export const postScout = store => next => action => {
  if (action.type === types.SUBMIT_NEW_USER) {
    const state = store.getState().appData

    const scout_id = helperFunctions.generateScoutID(state)
    const sheet_id = helperFunctions.generateSheetID(state)
    const date = state.year
    let result = next(action)

    let form = {name: helperFunctions.encodeStr(state.newScout.name), id: scout_id, years: {['' + date]: sheet_id}, customerIDs: []}

    fetch(url + `/scouts`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(json => store.dispatch(actions.requestScoutPost()))
      .then(response => {
        if (response.status >= 400) {
          store.dispatch(actions.scoutPostResult(false, new Error("Bad response from server")))
        } else {
          store.dispatch(actions.scoutPostResult(true, null))
          fetch(url + `/scouts`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => store.dispatch(actions.receiveScouts(json)))

          form = helperFunctions.preStringifySheet({sales: helperFunctions.copy(state.newScout.sales)}, sheet_id)
          console.log('form: ', form)

          fetch(url + `/sheets`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
              'Content-Type': 'application/json',
              'submitted-by': 'postScout sheet fetch',
              'Authorization': 'JWT ' + jwt
            }
          })
            .then(json => store.dispatch(actions.requestSheetPost()))
            .then(response => {
              if (response.status >= 400){
                store.dispatch(actions.sheetPostResult(false, new Error("Bad response from server")))
              } else {
                store.dispatch(actions.sheetPostResult(true, null))
                fetch(url + `/sheets`, {headers: {'Authorization': 'JWT ' + jwt}})
                  .then(response => response.json())
                  .then(json => store.dispatch(actions.receiveSalesheets(json)))
              }
            })
        }
      })



    return result
  } else {
    return next(action)
  }
}

export const postLeads = store => next => action => {
  if (action.type === types.ADD_LEAD){
    const state = store.getState()

    const id = action.scoutID; const lead = action.custID
    let form = {id: id, lead: lead}
    let result = next(action)

    fetch(url + `/leads`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(json => store.dispatch(actions.requestLeadPost()))
      .then(response => {
        if (response.status >= 400){
          store.dispatch(actions.leadPostResult(false, new Error("Bad response from server")))
        } else {
          store.dispatch(actions.leadPostResult(true, null))
          fetch(url + `/scouts`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => store.dispatch(actions.receiveScouts(json)))
        }
      })
    return result
  } else {
    return next(action)
  }
}

// export const postLogin = store => next => action => {
//   if (action.type === types.LOGIN_ATTEMPT) {
//     const state = store.getState()
//
//     const creds = action.creds
//     let form = {username: creds.username, password: creds.password}
//     let result = next(action)
//
//     fetch(`http://powerful-sea-27631.herokuapp.com/leads`)
//   }
// }
