import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// actions
import { toggleMobileMenu } from '../../actions/menu'

const Logo = ({ menu, toggleMobileMenu, classes }) => {
  return (
    <div onClick={menu.showMobileMenu ? () => toggleMobileMenu() : () => {}} className={classes}>
      <Link to='/'>
        <i className='fab fa-canadian-maple-leaf'></i> CAPermits
      </Link>
    </div>
  )
}

Logo.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  menu: state.menu
})

export default connect(mapStateToProps, { toggleMobileMenu })(Logo)
