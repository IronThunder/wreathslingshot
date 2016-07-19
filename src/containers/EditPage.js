/**
 * Created by Duncan on 7/17/2016.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/appActions';
import EditPageTable from '../components/EditPageTable';
import NewUsernameInput from '../components/NewUsernameInput';
import SubmitNewScoutButton from '../components/SubmitNewScoutButton'

const EditPage = (props) => {
  return (
    <div>
      <label>Name of new scout: </label><NewUsernameInput
        onChange={props.actions.changeNewUser}
        placeholder={props.appData.newScout.name}
      />
      <br/><br/>
      <EditPageTable
        appData={props.appData}
        changeData={props.actions.changeData}
        changeNewCustomer={props.actions.changeNewCustomer}
        addCustomer={props.actions.addCustomer}
      />
      <br/><br/>
      <SubmitNewScoutButton onPress={props.actions.submitNewScout}/>
    </div>
  );
};

EditPage.propTypes = {
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
)(EditPage);
