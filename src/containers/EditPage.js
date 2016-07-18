/**
 * Created by Duncan on 7/17/2016.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';

export const EditPage = (props) => {
  return (
    <div>Hello world!</div>
  );
};

EditPage.propTypes = {
  name: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.fuelSavings.newScout.name
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
