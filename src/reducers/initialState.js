export default {
  appData: {

    customerFetch: {
      isFetching: false,
      items: []
    },

    scoutFetch: {
      isFetching: false,
      items: []
    },

    sheetFetch: {
      isFetching: false,
      items: []
    },

    
    scoutList: [{name: "Duncan Vogel", id: 1}],
    types: {'Small': 20.00, 'Medium': 40.00},
    pTypes: ['Paid?', 'Delivered?'],
    newScout: {name: 'New Scout Name', sales: {}},
    visible: 'hidden',
    newCustomer: {name: 'New Customer Name', products: [{type: 'Small', num: 0}, {type: 'Medium', num: 0}], properties: {}},
    username: 'Duncan Vogel',
    scouts: {
      'Duncan Vogel': {sales:
          {'Jane Smith': {products: [{type: 'Small', num: 3}, {type: 'Medium', num: 2}], properties: {'Paid?': true, 'Delivered?': false}},
            'John Smith': {products: [{type: 'Small', num: 8}, {type: 'Medium', num: 9}], properties: {}}}},
      'default': {sales: {}}
    },
    customers: [{'Customer Name': 'John Smith', 'Phone Number': 2032032032, 'Active?': true}],
    customerFields: ['Customer Name', 'Phone Number', 'Active?'],
    newStaticCustomer: {'Customer Name': '', 'Phone Number': '', 'Active?': false}
  }
};
