export default {
  fuelSavings: {
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
    newScout: {name: 'ns', sales: [{type: 'Small', num: -1}, {type: 'Medium', num: -1}]},
    username: 'Duncan Vogel',
    scouts: {
      'Duncan Vogel': {sales: [{type: 'Small', num: 3}, {type: 'Medium', num: 2}]},
      'default': {sales: []}
    }
  }
};
