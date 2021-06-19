import React from 'react'

// Components
import DashApplicant from './DashApplicant'

const DashboardData = ({ name, application }) => {
  return (
    <div className='dashboard'>
      <div className='card'>
        <div className='card__title'>@{name}</div>
        <div className='card__body'>
          <div className='card__info'>
            <div className='card__subtitle'>Application Date</div>
            <div className='card__pb'>{application.date}</div>
            <div className='card__subtitle'>Status</div>
            <div className=''>{application.status}</div>
          </div>
          <div className='card__weeks'>
            <div className='card__number'>{application.weeks}</div>
            <div className=''>Weeks</div>
          </div>
        </div>
      </div>
      <div className='dashboard__title'>Applicants</div>
      {application.applicants.map(applicant => {
        return <DashApplicant key={applicant._id} applicant={applicant} />
      })}
      <div className='dashboard__title'>Response</div>
      <div className=''>
        <div className=''>Date: {application.response.date}</div>
        <div className=''>Visa Office: {application.response.visaOffice}</div>
      </div>
      <div className='dashboard__title'>Passport</div>
      <div className=''>
        <div className=''>Date Sent: {application.passport.dateSent}</div>
        <div className=''>Date Received: {application.passport.dateReceived}</div>
        <div className=''>VAC: {application.passport.dateReceived}</div>
      </div>
      <div className='dashboard__title'>Comments</div>
      <div className='dashboard__data'>
        <textarea name='' id='' cols='100' rows='10' disabled={true}>
          {application.comments}
        </textarea>
      </div>
    </div>
  )
}

export default DashboardData
