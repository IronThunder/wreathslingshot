/**
 * Created by Duncan on 7/17/2016.
 */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/appActions'
import AddPageTable from '../components/AddPageTable'
import NewUsernameInput from '../components/NewUsernameInput'
import SubmitNewScoutButton from '../components/SubmitNewScoutButton'
import EditScoutButton from '../components/EditScoutButton'

const AddPage = (props) => {
  return (
    <div>
      <label>Name of new scout: </label><NewUsernameInput
        onChange={props.actions.changeNewUser}
        value={props.appData.newScout.name}
      />
      <EditScoutButton onPress={props.actions.getScoutInfo} visible={props.appData.visible} name={props.appData.newScout.name}/>
      <br/><br/>
      <AddPageTable
        appData={props.appData}
        changeData={props.actions.changeData}
        changeNewCustomer={props.actions.changeNewCustomer}
        addCustomer={props.actions.addCustomer}
        removeCustomer={props.actions.removeCustomer}
        changeCustomerProperty={props.actions.changeCustomerProperty}
      />
      <br/><br/>
      <SubmitNewScoutButton onPress={props.actions.submitNewScout}/>
    </div>
  );
};

AddPage.propTypes = {
  appData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPage);
