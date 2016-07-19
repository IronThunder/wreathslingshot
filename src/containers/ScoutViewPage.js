import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/appActions';
import ScoutViewForm from '../components/ScoutViewForm';

export const ScoutViewPage = (props) => {
  return (
    <ScoutViewForm
      saveFuelSavings={props.actions.saveFuelSavings}
      calculateFuelSavings={props.actions.calculateFuelSavings}
      appData={props.appData}
    />
  );
};

ScoutViewPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired
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
)(ScoutViewPage);
