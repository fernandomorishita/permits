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

      <div className='dashboard__title'>College</div>
      <div className='dashboard__grid'>
        <div className='dashboard__data'>
          <div className=''>Name:</div>
          <div className=''>{application.college.name}</div>
        </div>
        <div className='dashboard__data'>
          <div className='dashboard__subtitle'>Credential:</div> {application.college.credential}
        </div>
        <div className='dashboard__data'>
          <div className=''>Type:</div> {application.college.type}
        </div>
        <div className='dashboard__data'>
          <div className=''>Intake:</div> {application.college.intake}
        </div>
        <div className='dashboard__data'>
          <div className=''>AIP:</div> {application.college.hasAIP}
        </div>
        <div className='dashboard__data'>
          <div className=''>Started Online:</div> {application.college.startedOnline}
        </div>
      </div>

      <div className='dashboard__response'>
        <div className=''>
          <div className='dashboard__title'>Response</div>
          <div className='dashboard__data'>
            <div className=''>Date:</div> {application.response.date}
          </div>
          <div className='dashboard__data'>
            <div className=''>Visa Office:</div> {application.response.visaOffice}
          </div>
        </div>
        <div className=''>
          <div className='dashboard__title'>Passport</div>
          <div className='dashboard__data'>
            <div className=''>Date Sent:</div> {application.passport.dateSent}
          </div>
          <div className='dashboard__data'>
            <div className=''>Date Received:</div> {application.passport.dateReceived}
          </div>
          <div className='dashboard__data'>
            <div className=''>VAC:</div> {application.passport.dateReceived}
          </div>
        </div>
      </div>
      <div className='dashboard__title'>Comments</div>
      <div className='dashboard__data dashboard__data__textarea'>
        <textarea name='' id='' cols='100' rows='10' value={application.comments} disabled={true}></textarea>
      </div>
    </div>
  )
}

export default DashboardData
