export default {
  appData: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    },
    types: ['Small', 'Medium'],
    pTypes: ['Paid?', 'Delivered?'],
    newScout: {name: 'New Scout Name', sales: {}},
    visible: 'hidden',
    newCustomer: {name: 'Dank memes', products: [], properties: {}},
    username: 'Duncan Vogel',
    scouts: {
      'Duncan Vogel': {sales:
          {'Jane Smith': {products: [{type: 'Small', num: 3}, {type: 'Medium', num: 2}], properties: {'Paid?': true, 'Delivered?': false}},
            'John Smith': {products: [{type: 'Small', num: 8}, {type: 'Medium', num: 9}], properties: {}}}},
      'default': {sales: {}}
    },
    customers: [{'Customer Name': 'John Smith', 'Phone Number': 2032032032, 'Active?': true, uses: 1}],
    customerFields: ['Customer Name', 'Phone Number', 'Active?'],
    newStaticCustomer: {'Customer Name': ''}
  }
};
