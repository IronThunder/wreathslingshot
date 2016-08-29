/**
 * Created by Duncan on 8/17/2016.
 */
import React, {PropTypes} from 'react';
import './../styles/ScoutViewForm.css';
import helperFunctions from '../utils/helperFunctions'
import AddLeadButton from './AddLeadButton'

class ScoutAssignmentsCell extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    const props = this.props
    props.onChange(document.getElementById("assignment-cell-select:" + props.scout.id).value, props.scout.id)
  }

  render () {
    const scout = this.props.scout
    const appData = this.props.appData
    const unused = helperFunctions.findUnassignedCustomers(appData)
    const handleChange = this.handleChange

    return (
      <div>
        <h5>Scout: {scout.name}</h5>
        <ul>
          {helperFunctions.getLeads(appData, scout.customerIDs).map(lead => (<li key={'Assignments?scout=' + scout.id + 'lead=' + lead._id}>{lead['Customer Name']}</li>))}
        </ul>
        <select id={"assignment-cell-select:" + scout.id}>
          {unused.map(cust => (
            <option value={cust._id} key={'option?scout=' + scout.id + 'cust=' + cust._id}>{cust['Customer Name']}</option>
          ))}
        </select>
        <AddLeadButton scoutName={scout.name} onPress={handleChange} />
      </div>
    )
  }
}

ScoutAssignmentsCell.propTypes = {
  appData: PropTypes.object.isRequired,
  scout: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ScoutAssignmentsCell
