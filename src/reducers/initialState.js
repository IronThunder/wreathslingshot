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
    newScout: {name: 'New Scout Name', sales: {}},
    newCustomer: {name: '', products: []},
    username: 'Duncan Vogel',
    scouts: {
      'Duncan Vogel': {sales:
          {'Jane Smith': {products: [{type: 'Small', num: 3}, {type: 'Medium', num: 2}]},
            'John Smith': {products: [{type: 'Small', num: 8}, {type: 'Medium', num: 9}]}}},
      'default': {sales: {}}
    }
  }
};
