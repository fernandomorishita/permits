import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const NavLinks = ({ auth, screen }) => {
  return (
    <div className={`navlinks ${screen}`}>
      <div className='navlinks__general'>
        <ul>
          <li>Charts</li>
          <li>Database</li>
        </ul>
      </div>
      {auth.isAuthenticated && auth.user ? (
        <div className='navlinks__user'>
          <ul>
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
