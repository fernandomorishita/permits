import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// components
import NavbarSandwich from './NavbarSandwich'
import Logo from '../general/Logo'
import NavbarSign from './NavbarSign'
import NavLinks from '../navlinks/NavLinks'

const navbar = ({ auth }) => {
  return (
    <div className='navbar'>
      <NavbarSandwich />
      <Logo classes={'navbar__logo'} />
      <NavbarSign />
      <NavLinks screen='medium' />
    </div>
  )
}

navbar.propTypes = {}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(navbar)
