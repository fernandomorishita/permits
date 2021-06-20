import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Actions
import { getApplication } from '../../actions/application'

// Components
import Spinner from '../general/Spinner'
import DashApplicant from './DashApplicant'
import DashboardData from './DashboardData'

// Library
import { calcProcessingWeeks } from '../../utils/library'

const Dashboard = ({ auth, application, getApplication }) => {
  useEffect(() => {
    getApplication()
  }, [])

  if (application.isLoading || auth.isLoading || auth.user === null) {
    return <Spinner />
  }

  if (application.application === null) {
    return (
      <div className='dashboard'>
        <div className='dashboard__create'>
          <h1>Create an application!</h1>
          <Link to='/application' className='btn btn-grey'>
            Create!
          </Link>
        </div>
      </div>
    )
  }

  const responseDate = application.application.response ? application.application.response.date : ''
  const elapsedWeeks = calcProcessingWeeks(application.application.date.date, responseDate)
  const userApplication = {
    date: application.application.date.date,
    status: application.application.status,
    weeks: elapsedWeeks,
    applicants: application.application.applicants,
    response: {
      date: application.application.response ? application.application.response.date : '',
      visaOffice: application.application.response ? application.application.response.visaoffice : ''
    },
    passport: {},
    college: {},
    comments: application.application.comments
  }
  if (application.application.college) {
    userApplication.college.name = application.application.college.name ? application.application.college.name : ''
    userApplication.college.credential = application.application.college.credential ? application.application.college.credential : ''
    userApplication.college.type = application.application.college.type ? application.application.college.type : ''
    userApplication.college.intake = application.application.college.intake ? application.application.college.intake : ''
    userApplication.college.hasAIP = application.application.college.has_aip ? application.application.college.has_aip : ''
    userApplication.college.startedOnline = application.application.college.started_online ? application.application.college.started_online : ''
  }

  if (application.application.passport) {
    userApplication.dateSent = application.application.passport.date_sent ? application.application.passport.date_sent : ''
    userApplication.dateReceived = application.application.passport.date_received ? application.application.passport.date_received : ''
    userApplication.vac = application.application.passport.vac ? application.application.passport.vac : ''
  }

  return <DashboardData name={auth.user.name} application={userApplication} />
  /*
  return (
    <div className='dashboard'>
      <div className='card'>
        <div className='card__title'>@{auth.user.name}</div>
        <div className='card__body'>
          <div className='card__info'>
            <div className='card__subtitle'>Application Date</div>
            <div className='card__pb'>{application.application.date.date}</div>
            <div className='card__subtitle'>Status</div>
            <div className=''>{application.application.status}</div>
          </div>
          <div className='card__weeks'>
            <div className='card__number'>{elapsedWeeks}</div>
            <div className=''>Weeks</div>
          </div>
        </div>
      </div>
      <div className='dashboard__title'>Applicants</div>
      {application.application.applicants.map(applicant => {
        return <DashApplicant key={applicant._id} applicant={applicant} />
      })}
    </div>
  )
  */
}

Dashboard.propTypes = {
  getApplication: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  application: state.application
})

export default connect(mapStateToProps, { getApplication })(Dashboard)
