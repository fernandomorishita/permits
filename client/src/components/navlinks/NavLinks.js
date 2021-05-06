import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const NavLinks = ({ auth }) => {
  return (
    <div className='navlinks'>
      <div className='navlinks__general'>
        <ul>
          <li>Charts</li>
          <li>Database</li>
        </ul>
      </div>
      {auth.isAuthenticated ? (
        <div className='navlinks__user'>
          <ul>
            <li>{auth.user.alias}</li>
            <li>Dashboard</li>
            <li>Application</li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

NavLinks.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(NavLinks)
