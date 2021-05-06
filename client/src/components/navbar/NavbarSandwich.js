import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleMobileMenu } from '../../actions/menu'

const NavbarSandwich = ({ menu: { showMobileMenu }, toggleMobileMenu }) => {
  return (
    <div onClick={() => toggleMobileMenu()} className='navbar__sw'>
      <div className={`navbar__sw-hidden ${showMobileMenu ? '' : 'navbar__sw-hidden--is-visible'}`}>
        <div className='navbar__sw-top'></div>
        <div className='navbar__sw-mid'></div>
        <div className='navbar__sw-bot'></div>
      </div>
      <div className={`navbar__sw-shown ${showMobileMenu ? 'navbar__sw-shown--is-visible' : ''}`}>
        <div className='navbar__sw-c1'></div>
        <div className='navbar__sw-c2'></div>
      </div>
    </div>
  )
}

NavbarSandwich.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  menu: state.menu
})
export default connect(mapStateToProps, { toggleMobileMenu })(NavbarSandwich)
