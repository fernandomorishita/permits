import React, { Fragment } from 'react'

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
