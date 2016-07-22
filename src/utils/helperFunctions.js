/**
 * Created by Duncan on 7/22/2016.
 */
export default class helperFunctions {

  static findUses (state, name) {
    let result = 0
    for (let i = 0; i < Object.keys(state.scouts).length; i++){
      for (let x = 0; x < Object.keys(state.scouts[Object.keys(state.scouts)[i]].sales).length; x++){
        if (Object.keys(state.scouts[Object.keys(state.scouts)[i]].sales)[x] === name) {
          result++
        }
      }
    }
    return result
  }

  static copy (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    let temp = obj.constructor(); // give temp the original obj's constructor
    for (let key in obj) {
      temp[key] = this.copy(obj[key]);
    }

    return temp;
  }

  static generateInitialProducts (types) {
    return types.map(type => ({type: type, num: 0}))
  }

  static getProduct (products, name) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].type === name){
        return products[i]
      }
    }
    return undefined
  }

  static numProduct (scout, type) {
    let total = 0
    Object.keys(scout.sales).map((saleKey) => {
      scout.sales[saleKey].products.map(product =>{
        if (product.type === type) {total += product.num}
      })

    })
    return total
  }

  static customerValue (state, scoutName, custName) {
    let total = 0
    let products = state.scouts[scoutName].sales[custName].products
    products.map(product => {total += (product.num * state.types[product.type] || 0)})
    return total
  }

  static scoutValue (state, scoutName) {
    let total = 0
    Object.keys(state.scouts[scoutName].sales).map(custName => {
      let products = state.scouts[scoutName].sales[custName].products
      products.map(product => {
        total += (product.num * state.types[product.type] || 0)
      })
    })
    return total
  }
}
