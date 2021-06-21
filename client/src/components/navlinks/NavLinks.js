import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Actions
import { toggleMobileMenu } from '../../actions/menu'

const NavLinks = ({ auth, menu, toggleMobileMenu, screen }) => {
  return (
    <div className={`navlinks ${screen}`}>
      <div className='navlinks__general'>
        <ul onClick={menu.showMobileMenu ? () => toggleMobileMenu() : () => {}}>
          <Link to='/charts'>
            <li>Charts</li>
          </Link>
          <Link to='/database'>
            <li>Database</li>
          </Link>
          <Link to='/faq'>
            <li>FAQ</li>
          </Link>
        </ul>
      </div>
      {auth.isAuthenticated && auth.user ? (
        <Fragment>
          <div className='navlinks__separator'></div>
          <div className='navlinks__user'>
            <ul onClick={menu.showMobileMenu ? () => toggleMobileMenu() : () => {}}>
              <li className='small'>@{auth.user.name}</li>
              <Link to='/dashboard'>
                <li>Dashboard</li>
              </Link>
              <Link to='/application'>
                <li>Application</li>
              </Link>
            </ul>
          </div>
        </Fragment>
      ) : (
        ''
      )}
    </div>
  )
}

NavLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  menu: state.menu
})
export default connect(mapStateToProps, { toggleMobileMenu })(NavLinks)
