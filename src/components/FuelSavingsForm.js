import React, {PropTypes} from 'react';
import FuelSavingsResults from './FuelSavingsResults';
import FuelSavingsTextInput from './FuelSavingsTextInput';
import styles from './../styles/FuelSavingsForm.css'

class FuelSavingsForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.save = this.save.bind(this);
    this.onTimeframeChange = this.onTimeframeChange.bind(this);
    this.fuelSavingsKeypress = this.fuelSavingsKeypress.bind(this);
  }

  onTimeframeChange(e) {
    this.props.calculateFuelSavings(this.props.fuelSavings, 'milesDrivenTimeframe', e.target.value);
  }

  fuelSavingsKeypress(name, value) {
    console.log(value);
    this.props.calculateFuelSavings(this.props.fuelSavings, name, value);
  }

  save() {
    this.props.saveFuelSavings(this.props.fuelSavings);
  }

  render() {
    const {fuelSavings} = this.props;
    var user = '';
    if (typeof fuelSavings.scouts[fuelSavings.username] != 'undefined') {
      user = fuelSavings.username;
    }
    else {
      user = 'default';
    }
    console.log(user);

    return (
      <div>
        <h3>Scout: <FuelSavingsTextInput onChange={this.fuelSavingsKeypress} name="scout_user" value={fuelSavings.username}/></h3>
        <h2>Sales Information for {user}</h2>
        <table className={styles.table}>
          <thead>
            <tr><th>Product Type</th><th>Number Sold</th></tr>
          </thead>
          <tbody>
            {fuelSavings.scouts[user].sales.map(function (sale) {return <tr><td>{sale.type}</td><td>{sale.num}</td></tr>})}
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
