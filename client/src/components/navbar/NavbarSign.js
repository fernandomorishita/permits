import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// actions
import { toggleMobileMenu } from '../../actions/menu'

const NavbarSign = ({ auth, menu, toggleMobileMenu }) => {
  return (
    <div onClick={menu.showMobileMenu ? () => toggleMobileMenu() : () => {}} className='navbar__sign'>
      {auth.isAuthenticated ? (
        <div>
          <small>Sign out</small>
        </div>
      ) : (
        <div>
          <Link to='/register'>
            <small>Sign in</small>
          </Link>
        </div>
      )}
    </div>
  )
}

NavbarSign.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  menu: state.menu
})
export default connect(mapStateToProps, { toggleMobileMenu })(NavbarSign)
