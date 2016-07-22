import React, {PropTypes} from 'react';
import ScoutViewTextInput from './ScoutViewTextInput';
import './../styles/ScoutViewForm.css';
import helperFunctions from '../utils/helperFunctions'

class ScoutViewForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.fuelSavingsKeypress = this.fuelSavingsKeypress.bind(this);
  }

  fuelSavingsKeypress(name, value) {
    this.props.calculateFuelSavings(this.props.appData, name, value);
  }

  render() {
    const {appData} = this.props;
    let user = '';
    if (typeof appData.scouts[appData.username] !== 'undefined') {
      user = appData.username;
    }
    else {
      user = 'default';
    }

    const chooseColor = (state, name) => {
      let bgcolor = 'purple'
      let txtcolor = 'white'
      state.customers.map(customer => {
        if (customer['Customer Name'] === name && helperFunctions.findUses(state, customer['Customer Name']) < 2){
          bgcolor = 'white'
          txtcolor = 'black'
        }
        else if (customer['Customer Name'] === name) {
          bgcolor = 'red'
          txtcolor = 'white'
        }
      })
      return {bg: bgcolor, txt: txtcolor}
    }

    const display = (component) => {
      if (typeof component === 'undefined' || component == null){
        return 'Unknown'
      }
      else if (typeof component === 'boolean'){
        return displayBool(component)
      }
      else {
        return component
      }
    }

    const displayBool = (bool) => {
      if (bool) {
        return "Yes"
      }
      else {
        return "No"
      }
    }

    const sales = appData.scouts[user].sales

    return (
      <div>
        <h3>Scout: <ScoutViewTextInput onChange={this.fuelSavingsKeypress} name="scout_user" value={appData.username}/></h3>
        <h2>Sales Information for {user}</h2>
        <table className="table">
          <thead>
            <tr><th>Customer</th>{Object.keys(appData.types).map(type => (<th key={"header-" + type}>{type}</th>))}{appData.pTypes.map(type => (<th key={"header-" + type}>{type}</th>))}<th>Amount Owed</th></tr>
          </thead>
          <tbody>
            {Object.keys(sales).map(saleKey => (
              <tr key={saleKey} >
                <td style={{'backgroundColor': chooseColor(appData, saleKey).bg, 'color': chooseColor(appData, saleKey).txt}}>{saleKey}</td>{Object.keys(appData.types).map(type => {
                const products = sales[saleKey].products;
                for (let i = 0; i < products.length; i++){
                  if (products[i].type == type) {
                    return (<td key={type}>{products[i].num}</td>)
                  }
                }
                return (<td key={type}>0</td>)
            })}
                {appData.pTypes.map(propKey => {
                  return (<td key={propKey}>{display(sales[saleKey].properties[propKey])}</td>)
                })}
                <td>{'$' + (helperFunctions.customerValue(appData, user, saleKey)).toFixed(2)}</td>
              </tr>))}
          <tr>
            <td style={{'backgroundColor': 'grey', 'color':'white'}}><b>Total Sold</b></td>{Object.keys(appData.types).map(type => (<td key={type}>{helperFunctions.numProduct(appData.scouts[user], type)}</td>))}
            {appData.pTypes.map(propKey => (<td key={propKey}/>))}
            <td/>
          </tr>
          <tr>
            <td style={{'backgroundColor': 'grey', 'color':'white'}}><b>Total Value</b></td>{Object.keys(appData.types).map(type => (<td key={type}>{'$' + (helperFunctions.numProduct(appData.scouts[user], type)*appData.types[type]).toFixed(2)}</td>))}
            {appData.pTypes.map(propKey => (<td key={propKey}/>))}
            <td>{'$' + helperFunctions.scoutValue(appData, user).toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ScoutViewForm.propTypes = {
  calculateFuelSavings: PropTypes.func.isRequired,
  appData: PropTypes.object.isRequired
};

export default ScoutViewForm;
