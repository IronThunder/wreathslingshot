/**
 * Created by Duncan on 7/18/2016.
 */
import React, {PropTypes} from 'react';
import NumberEntryInput from '../components/NumberEntryInput';

class EditPageTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.changeDataKeypress = this.changeDataKeypress.bind(this);
  }

  changeDataKeypress (name, value) {
    this.props.changeData(name, value);
  }

  render() {
    const { newScout } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr><th>Type of Product</th><th>Number Sold</th></tr>
          </thead>
          <tbody>
          {newScout.sales.map(sale => (<tr key={sale.type}><td>{sale.type}</td><td><NumberEntryInput
                                                                      type={sale.type}
                                                                      value={sale.num}
                                                                      onChange={this.changeDataKeypress}/></td></tr>))}
          </tbody>
        </table>
      </div>
    );
  }

}

EditPageTable.propTypes = {
  newScout: PropTypes.object.isRequired,
  changeData: PropTypes.func.isRequired
};

export default EditPageTable;
