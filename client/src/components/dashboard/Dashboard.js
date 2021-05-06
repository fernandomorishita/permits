import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Dashboard = ({ auth }) => {
  if (auth.isLoading) return <div></div>
  return <div>Dashboard</div>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
