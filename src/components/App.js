import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const App = (props) => {
  return (
    <div>
      <IndexLink to="/">Home</IndexLink>
      {' | '}
      <Link to="/fuel-savings">Scout Viewer</Link>
      {' | '}
      <Link to="/edit">Add Scout[s]</Link>
      {' | '}
      <Link to="/customers">All Customers</Link>
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
