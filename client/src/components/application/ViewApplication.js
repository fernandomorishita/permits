import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { clearApplicationById, getApplicationById } from '../../actions/application'

// Components
import Spinner from '../general/Spinner'
import DashboardData from '../dashboard/DashboardData'

// Library
import { calcProcessingWeeks } from '../../utils/library'

const ViewApplication = ({
  getApplicationById,
  clearApplicationById,
  match: {
    params: { id }
  },
  application: { appl_by_id }
}) => {
  useEffect(() => {
    getApplicationById(id)

    return () => {
      clearApplicationById()
    }
  }, [])

  if (appl_by_id === null) return <Spinner />

  const responseDate = appl_by_id.response ? appl_by_id.response.date : ''
  const elapsedWeeks = calcProcessingWeeks(appl_by_id.date.date, responseDate)
  const application = {
    date: appl_by_id.date.date,
    status: appl_by_id.status,
    weeks: elapsedWeeks,
    applicants: appl_by_id.applicants,
    response: {
      date: appl_by_id.response ? appl_by_id.response.date : '',
      visaOffice: appl_by_id.response ? appl_by_id.response.visaoffice : ''
    },
    passport: {},
    college: {},
    comments: appl_by_id.comments
  }

  if (appl_by_id.college) {
    application.college.name = appl_by_id.college.name ? appl_by_id.college.name : ''
    application.college.credential = appl_by_id.college.credential ? appl_by_id.college.credential : ''
    application.college.type = appl_by_id.college.type ? appl_by_id.college.type : ''
    application.college.intake = appl_by_id.college.intake ? appl_by_id.college.intake : ''
    application.college.hasAIP = appl_by_id.college.has_aip ? appl_by_id.college.has_aip : ''
    application.college.startedOnline = appl_by_id.college.started_online ? appl_by_id.college.started_online : ''
  }

  if (appl_by_id.passport) {
    appl_by_id.dateSent = appl_by_id.passport.date_sent ? appl_by_id.passport.date_sent : ''
    appl_by_id.dateReceived = appl_by_id.passport.date_received ? appl_by_id.passport.date_received : ''
    appl_by_id.vac = appl_by_id.passport.vac ? appl_by_id.passport.vac : ''
  }
  return <DashboardData name={appl_by_id.user_id.name} application={application} />
}

ViewApplication.propTypes = {
  application: PropTypes.object.isRequired,
  getApplicationById: PropTypes.func.isRequired,
  clearApplicationById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  application: state.application
})
export default connect(mapStateToProps, { getApplicationById, clearApplicationById })(ViewApplication)
