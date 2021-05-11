import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// actions
import { toggleMobileMenu } from '../../actions/menu'
import { logout } from '../../actions/auth'

const NavbarSign = ({ auth, menu, toggleMobileMenu, logout }) => {
  return (
    <div onClick={menu.showMobileMenu ? () => toggleMobileMenu() : () => {}} className='navbar__sign'>
      {auth.isAuthenticated && auth.user ? (
        <Fragment>
          <div className='btn medium'>
            <small>@{auth.user.name} </small>
          </div>
          <div className='btn' onClick={() => logout()}>
            <Link to='/'>
              <small>Sign out</small>
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='btn'>
            <Link to='/login'>
              <small>Sign in</small>
            </Link>
          </div>
          <div className='btn medium'>
            <Link to='/register'>
              <small>Sign up</small>
            </Link>
          </div>
        </Fragment>
      )}
    </div>
  )
}

NavbarSign.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  menu: state.menu
})
export default connect(mapStateToProps, { toggleMobileMenu, logout })(NavbarSign)
