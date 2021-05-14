import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Status = ({ value, icon, text }) => {
  return (
    <Fragment>
      {value} <i class={`fas fa-${icon}`}></i>
      <small> {text}</small>
    </Fragment>
  )
}

Status.propTypes = {}

export default Status
