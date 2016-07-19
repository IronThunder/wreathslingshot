import React, {PropTypes} from 'react';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import './../styles/FuelSavingsForm.css';

class FuelSavingsForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.fuelSavingsKeypress = this.fuelSavingsKeypress.bind(this);
  }

  fuelSavingsKeypress(name, value) {
    this.props.calculateFuelSavings(this.props.fuelSavings, name, value);
  }

  render() {
    const {fuelSavings} = this.props;
    let user = '';
    if (typeof fuelSavings.scouts[fuelSavings.username] != 'undefined') {
      user = fuelSavings.username;
    }
    else {
      user = 'default';
    }

    return (
      <div>
        <h3>Scout: <FuelSavingsTextInput onChange={this.fuelSavingsKeypress} name="scout_user" value={fuelSavings.username}/></h3>
        <h2>Sales Information for {user}</h2>
        <table className="table">
          <thead>
            <tr><th>Product Type</th><th>Number Sold</th></tr>
          </thead>
          <tbody>
            {fuelSavings.scouts[user].sales.map(sale => (<tr key={sale.type}><td>{sale.type}</td><td>{sale.num}</td></tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

FuelSavingsForm.propTypes = {
  saveFuelSavings: PropTypes.func.isRequired,
  calculateFuelSavings: PropTypes.func.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

export default FuelSavingsForm;
