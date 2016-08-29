import React, { PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import AuthButton from './AuthButton'
import helperFunctions from '../utils/helperFunctions'

const App = (props) => {
  const admin = localStorage.getItem('profile') ? helperFunctions.getProp(JSON.parse(localStorage.getItem('profile')), 'admin', false) : false
  let children = null
  if (props.children) {
    children = React.cloneElement(props.children, {
      auth: props.route.auth, //sends auth instance from route to children
      admin: admin
    })
  }

  if (admin) {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/scout-view">Scout Viewer</Link>
        {' | '}
        <Link to="/edit">Add/Edit Scout[s]</Link>
        {' | '}
        <Link to="/customers">All Customers</Link>
        {' | '}
        <Link to="/leads">Assign Leads</Link>
        <AuthButton auth={props.route.auth}/>
        <br/>
        {children}
      </div>
    )
  } else {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/scout-view">Scout Viewer</Link>
        {' | '}
        <Link to="/edit">Add/Edit Scout[s]</Link>
        {' | '}
        <Link to="/customers">All Customers</Link>
        <AuthButton auth={props.route.auth}/>
        <br/>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default App
