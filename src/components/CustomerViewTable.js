/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';
import AddCustomerTable from './AddCustomerTable'
import UnusedCustomerList from './UnusedCustomerList'
import helperFunctions from '../utils/helperFunctions'

class CustomerViewTable extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.changeStaticCustomerData = this.changeStaticCustomerData.bind(this)
  }

  changeStaticCustomerData (key, name) {
    this.props.changeStaticCustomerData(key, name)
  }


  render () {

    const display = (component) => {
      if (typeof component === 'boolean'){
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

    const chooseColor = (customer) => {
      let uses = helperFunctions.findUses(this.props.appData, customer['Customer Name'])
      if (uses < 1){
        return 'green'
      }
      else if (uses === 1) {
        return 'blue'
      }
      else {
        return 'red'
      }
    }

    const fields = this.props.appData.customerFields

    return (
      <div>
        <table>
          <thead>
            <tr>{this.props.appData.customerFields.map(field => (<th key={field}>{field}</th>))}</tr>
          </thead>
          <tbody>
            {this.props.appData.customers.map(customer => (<tr key={customer._id + '-row'} style={{'backgroundColor': chooseColor(customer), 'color': 'white'}}>{fields.map(field => (<td key={customer._id + '-cell' + '-' + field}>{display(customer[field]) || 'Unknown'}</td>))}</tr>))}
          </tbody>
        </table>
        <br/><br/><br/>
        <UnusedCustomerList appData={this.props.appData} />
        <br/><br/>
        <AddCustomerTable changeStaticCustomerData={this.changeStaticCustomerData} appData={this.props.appData} addNewStaticCustomer={this.props.addNewStaticCustomer}/>
      </div>
    )
  }

}

CustomerViewTable.propTypes = {
  appData: PropTypes.object.isRequired,
  changeStaticCustomerData: PropTypes.func.isRequired,
  addNewStaticCustomer: PropTypes.func.isRequired
}

export default CustomerViewTable
