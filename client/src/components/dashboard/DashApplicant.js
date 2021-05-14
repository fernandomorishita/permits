import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Library
import { getMedicalStatus } from '../../utils/library'

// Components
import Status from './Status'

const DashApplicant = ({ applicant }) => {
  const medStatus = getMedicalStatus(applicant.medical.date)
  const medIcon = medStatus !== '' ? 'exclamation' : 'check'
  return (
    <div className='applicant'>
      <div className='applicant__header'>
        <div className=''>
          {applicant.type} - {applicant.visa_type}
        </div>
        <div className=''>{applicant.status}</div>
      </div>
      <div className='applicant__line'>Biometrics: {applicant.biometrics.date ? <Status value={applicant.biometrics.date} icon={'check'} /> : <Status value={'N/A'} icon={'exclamation'} />}</div>
      <div className=''>Medical: {applicant.medical.date ? <Status value={applicant.medical.date} icon={medIcon} text={medStatus} /> : <Status value={'N/A'} icon='exclamation' />}</div>
      <div className='h-bar h-bar--mt'></div>
    </div>
  )
}

DashApplicant.propTypes = {}

const mapStateToProps = state => ({
  application: state.application
})
export default connect(mapStateToProps)(DashApplicant)
