import React, { Fragment } from 'react'

const Status = ({ value, icon, text }) => {
  return (
    <Fragment>
      {value} <i className={`fas fa-${icon}`}></i>
      <small> {text}</small>
    </Fragment>
  )
}

Status.propTypes = {}

export default Status
