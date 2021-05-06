import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Welcome = ({ auth, application }) => {
  let userName = ''
  if (auth.isAuthenticated) {
    application ? (userName = application.alias) : (userName = auth.email)
  } else {
    userName = 'Guest'
  }
  return <div>{userName}</div>
}

Welcome.propTypes = {}

const mapStateToProps = state => ({
  auth: state.auth,
  application: state.application
})
export default connect(mapStateToProps)(Welcome)
