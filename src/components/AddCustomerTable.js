/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';
import ChangeNewCustomerData from './ChangeNewCustomerData'
import ChangeNewCustomerDataBoolean from './ChangeNewCustomerDataBoolean'
import AddNewCustomerButton from './AddNewCustomerButton'


class AddCustomerTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.onChangeStaticCustomerData = this.onChangeStaticCustomerData.bind(this)
    this.addNewStaticCustomer = this.addNewStaticCustomer.bind(this)
  }

  addNewStaticCustomer () {
    this.props.addNewStaticCustomer()
  }

  onChangeStaticCustomerData (key, name) {
    this.props.changeStaticCustomerData(key, name)
  }

  render () {
    const appData = this.props.appData

    const chooseType = (field) => {
      if (field.substring(field.length-1, field.length) === '?'){
        return (<ChangeNewCustomerDataBoolean index={field} onChange={this.onChangeStaticCustomerData}/>)
      }
      else {
        return (<ChangeNewCustomerData index={field} onChange={this.onChangeStaticCustomerData} placeholder={"New " + field}/>)
      }
    }

    return (
      <div>
        <table>
          <thead>
            <tr>{appData.customerFields.map(field => (<th  key={field}>{field}</th>))}<th/></tr>
          </thead>
          <tbody>
            <tr>{appData.customerFields.map(field => (<th  key={field}>{chooseType(field)}</th>))}<td><AddNewCustomerButton onPress={this.addNewStaticCustomer}/></td></tr>
          </tbody>
        </table>
      </div>
    )
  }

}

AddCustomerTable.propTypes = {
  appData: PropTypes.object.isRequired,
  changeStaticCustomerData: PropTypes.func.isRequired,
  addNewStaticCustomer: PropTypes.func.isRequired
}

export default AddCustomerTable
