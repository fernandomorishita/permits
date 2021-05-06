import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// components
import NavLinks from '../../navlinks/NavLinks'

const MobileMenu = ({ menu }) => {
  return (
    <div className={`mobile-menu ${menu.showMobileMenu ? 'mobile-menu--is-visible' : ''}`}>
      <NavLinks />
    </div>
  )
}

MobileMenu.propTypes = {
  menu: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  menu: state.menu
})
export default connect(mapStateToProps)(MobileMenu)
