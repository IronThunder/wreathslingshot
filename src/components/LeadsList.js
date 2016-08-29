/**
 * Created by Duncan on 8/17/2016.
 */
import React, { PropTypes } from 'react'
import helperFunctions from '../utils/helperFunctions'

class LeadsList extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render () {

    const appData = this.props.appData

    const scout_id = helperFunctions.findCurrentScoutID(appData)
    const ids = helperFunctions.lookupScoutByID(appData, scout_id).customerIDs

    return (
      <div>
        <b>Customer assigned as leads</b>
        <ul>
          {helperFunctions.getLeads(appData, ids).map(element => (<li key={'lead:' + element._id}>{element['Customer Name']}</li>))}
        </ul>
      </div>
    )
  }
}

LeadsList.propTypes = {
  appData: PropTypes.object.isRequired
}

export default LeadsList
