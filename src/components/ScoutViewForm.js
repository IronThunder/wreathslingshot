import React, {PropTypes} from 'react';
import ScoutViewTextInput from './ScoutViewTextInput';
import './../styles/ScoutViewForm.css';

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
    if (typeof appData.scouts[appData.username] != 'undefined') {
      user = appData.username;
    }
    else {
      user = 'default';
    }

    const sales = appData.scouts[user].sales

    return (
      <div>
        <h3>Scout: <ScoutViewTextInput onChange={this.fuelSavingsKeypress} name="scout_user" value={appData.username}/></h3>
        <h2>Sales Information for {user}</h2>
        <table className="table">
          <thead>
            <tr><th>Customer</th>{appData.types.map(type => (<th key={"header-" + type}>{type}</th>))}</tr>
          </thead>
          <tbody>
            {Object.keys(sales).map(saleKey => (<tr key={saleKey}><td>{saleKey}</td>{appData.types.map(type => {
              const products = sales[saleKey].products;
              for (let i = 0; i < products.length; i++){
                if (products[i].type == type) {
                  return (<td key={type}>{products[i].num}</td>)
                }
              }
              return (<td key={type}>0</td>)
            })}</tr>))}
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
