/**
 * Created by Duncan on 7/17/2016.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import EditPageTable from '../components/EditPageTable';

const EditPage = (props) => {
  return (
    <EditPageTable
      newScout={props.newScout}
      changeData={props.actions.changeData}
    />
  );
};

EditPage.propTypes = {
  newScout: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    newScout: state.fuelSavings.newScout
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
