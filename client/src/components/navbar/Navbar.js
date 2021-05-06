import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// components
import NavbarSandwich from './NavbarSandwich'
import Logo from '../general/Logo'
import NavbarSign from './NavbarSign'

const navbar = ({ auth }) => {
  return (
    <div className='navbar'>
      {/* sandwich menu */}
      <NavbarSandwich />
      {/* logo */}
      <Logo classes={'navbar__logo'} />
      {/* sign in / sing out */}
      <NavbarSign />
    </div>
  )
}

navbar.propTypes = {}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(navbar)
