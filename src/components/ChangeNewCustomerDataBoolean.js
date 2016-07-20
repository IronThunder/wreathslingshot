/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';

const ChangeNewCustomerDataBoolean = (props) => {

  const handleChangeTrue = (e) => {
    props.onChange(props.index, true)
  }

  const handleChangeFalse = (e) => {
    props.onChange(props.index, false)
  }

  return (
    <form action="">
      <input
        name={props.name || 'inputBool'}
        type="radio"
        onClick={handleChangeTrue}
      />T
      <input
        name={props.name || 'inputBool'}
        type="radio"
        onClick={handleChangeFalse}
      />F
    </form>
  )

}

ChangeNewCustomerDataBoolean.propTypes = {
  onChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  name: PropTypes.string
}

export default ChangeNewCustomerDataBoolean
