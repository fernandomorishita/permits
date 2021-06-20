import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { getVisas } from '../../actions/visas'
import { getApplication, createOrUpdateApplication, deleteApplication } from '../../actions/application'
import { getVisaOffices } from '../../actions/visaoffices'
import { getVacs } from '../../actions/vacs'
import { getCredentials } from '../../actions/credentials'

// Components
import Applicant from './Applicant'
import Spinner from '../general/Spinner'

// Defines
import { months, years } from '../../utils/defines'

const Application = ({ visas: { visas }, application, visaoffices, vacs, credentials, getVisas, getVacs, getCredentials, createOrUpdateApplication, getApplication, getVisaOffices, deleteApplication, history }) => {
  const applData = {
    id: 0,
    type: '',
    visa_type: '',
    status: '',
    medical: {
      date: '',
      is_upfront: false
    },
    biometrics: {
      date: ''
    }
  }

  const collegeData = {
    id: '',
    credentialId: '',
    name: '',
    credential: ''
  }

  const [formData, setFormData] = useState({
    applDate: '',
    applType: '',
    applicants: [{ ...applData, type: 'Main' }],
    consultantName: '',
    college: collegeData,
    resDate: '',
    visaOffice: '',
    passDateSent: '',
    passDateReceived: '',
    passVac: ''
  })

  // useEffects
  useEffect(() => {
    getVisas()
  }, [])

  useEffect(() => {
    getVacs()
  }, [])

  useEffect(() => {
    getCredentials()
  }, [])
  useEffect(() => {
    getApplication()

    let formFields = {}
    if (application.application) {
      formFields = {
        applDate: application.application.date.date,
        applType: application.application.type,
        applicants: application.application.applicants,
        consultantName: application.application.consultant.name,
        comments: application.application.comments
      }

      if (application.application.response) {
        formFields.resDate = application.application.response.date ? application.application.response.date : ''
        formFields.visaOffice = application.application.response.visaoffice ? application.application.response.visaoffice : ''
      }
      if (application.application.passport) {
        formFields.passDateSent = application.application.passport.date_sent ? application.application.passport.date_sent : ''
        formFields.passDateReceived = application.application.passport.date_received ? application.application.passport.date_received : ''
        formFields.passVac = application.application.passport.vac ? application.application.passport.vac : ''
      }
      if (application.application.college) {
        formFields.collegeName = application.application.college.name ? application.application.college.name : ''
        formFields.collegeCred = application.application.college.credential ? application.application.college.credential : ''
        formFields.collegeType = application.application.college.type ? application.application.college.type : ''
        formFields.intakeMonth = application.application.college.intake ? application.application.college.intake.slice(0, 3) : ''
        formFields.intakeYear = application.application.college.intake ? application.application.college.intake.slice(3, 8) : ''
        formFields.hasAIP = application.application.college.has_aip ? application.application.college.has_aip : ''
        formFields.startedOnline = application.application.college.started_online ? application.application.college.started_online : ''
      }
    } else {
      formFields = {
        applDate: '',
        applType: '',
        applicants: [{ ...applData, type: 'Main' }],
        consultantName: '',
        college: collegeData,
        comments: '',
        resDate: '',
        visaOffice: '',
        passDateSent: '',
        passDateReceived: '',
        passVac: '',
        collegeName: '',
        collegeCred: '',
        collegeType: '',
        intakeMonth: '',
        intakeYear: '',
        hasAIP: '',
        startedOnline: ''
      }
    }

    setFormData(formFields)
  }, [application.isLoading])

  useEffect(() => {
    getVisaOffices()
  }, [])
  const { applDate, applType, applicants, consultantName, comments, resDate, visaOffice, passDateSent, passDateReceived, passVac, collegeName, collegeCred, intakeMonth, intakeYear, hasAIP, startedOnline, collegeType } = formData

  const handleAddAppl = (e, index) => {
    applicants.push({ ...applData, type: 'Other' })
    setFormData({ ...formData, applicants })
  }

  const onChange = (e, field) => {
    switch (field) {
      case 'ResDate':
        if (e.target.value === '') {
          setFormData({ ...formData, visaOffice: 'N/A', passDateSent: '', passDateReceived: '', passVac: '', [e.target.name]: e.target.value })
          return
        }
        break
      default:
        break
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = e => {
    e.preventDefault()
    createOrUpdateApplication(formData, history)
  }

  function allApproved() {
    let ret = true
    formData.applicants.forEach(appl => {
      if (appl.status !== 'Approved') ret = false
    })
    return ret
  }
  if (visas === null) return <div></div>

  if (application.isLoading) {
    return <Spinner />
  }

  if (visaoffices.isLoading || visaoffices.visaOffices === null) {
    return <Spinner />
  }

  if (vacs === null || vacs.vacs.isLoading) {
    return <Spinner />
  }

  if (credentials === null || credentials.credentials.isLoading) {
    return <Spinner />
  }

  const handleDeleteApplication = e => {
    e.preventDefault()
    deleteApplication(history)
  }
  return (
    <div className='content--pw application'>
      <form onSubmit={e => onSubmit(e)} className='form'>
        {/* Application */}
        <div className='form__section-label'>
          <div className='form__flex form__flex--justify'>
            <div className='form__label form__label--bold'>Application </div>
            <i onClick={e => handleDeleteApplication(e)} className='fas fa-ban form__icon'></i>
          </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <div className='form__label'>Date </div>
          <input className='form__input form__date' type='date' name='applDate' value={applDate} onChange={e => onChange(e)} />
        </div>
        <div className='form__field'>
          <div className='form__label'>Type </div>
          <select name='applType' className='form__opt' value={applType} onChange={e => onChange(e)}>
            <option value='N/A'>N/A</option>
            <option value='Online'>Online</option>
            <option value='Paper'>Paper</option>
          </select>
        </div>

        {/* Applicants */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Applicants</div>
          <div className='form__separator'></div>
        </div>
        {applicants.map((appl, index) => {
          return <Applicant key={index} applicant={appl} index={index} formData={formData} setFormData={setFormData} allApproved={allApproved} />
        })}
        <div className='form__field'>
          <div onClick={e => handleAddAppl(e)} className=''>
            <i className='fas fa-plus'></i> Add Applicant
          </div>
        </div>

        {/* College */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>College/University </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <div className='form__label '>Name</div>
          <input className='form__input' type='text' name='collegeName' value={collegeName} onChange={e => onChange(e)} />
        </div>
        <div className='form__field'>
          <div className='form__label '>Credential</div>
          <select className='form__opt' name='collegeCred' value={collegeCred} onChange={e => onChange(e)}>
            <option value=''></option>
            {credentials.credentials.map(cred => {
              return (
                <option key={cred._id} value={cred.type}>
                  {cred.type}
                </option>
              )
            })}
          </select>
        </div>
        <div className='form__field'>
          <div className='form__label '>Type</div>
          <select className='form__opt' name='collegeType' value={collegeType} onChange={e => onChange(e)}>
            <option value=''></option>
            <option value='Public'>Public</option>
            <option value='Private'>Private</option>
          </select>
        </div>
        <div className='form__field'>
          <div className='form__label '>Intake</div>
          <select className='form__opt' type='text' name='intakeMonth' value={intakeMonth} onChange={e => onChange(e)}>
            <option value=''></option>
            {months.map((month, index) => {
              return (
                <option key={index} value={month}>
                  {month}
                </option>
              )
            })}
          </select>
          <select className='form__opt' type='text' name='intakeYear' value={intakeYear} onChange={e => onChange(e)}>
            <option value=''></option>
            {years.map((year, index) => {
              return (
                <option key={index} value={year}>
                  {year}
                </option>
              )
            })}
          </select>
        </div>
        <div className='form__field'>
          <div className='form__label '>Has AIP</div>
          <select className='form__opt' type='text' name='hasAIP' value={hasAIP} onChange={e => onChange(e)}>
            <option value=''></option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>
        <div className='form__field'>
          <div className='form__label '>Started Online</div>
          <select className='form__opt' type='text' name='startedOnline' value={startedOnline} onChange={e => onChange(e)}>
            <option value=''></option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>

        {/* Consultant */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Consultant </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <input className='form__input' type='text' name='consultantName' value={consultantName} onChange={e => onChange(e)} />
        </div>

        {/* Response */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Response </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <div className='form__label tooltip'>
            Date <span className='tooltiptext'>The date you received a final decision from IRCC</span>
          </div>
          <input className='form__input' type='date' name='resDate' value={resDate} disabled={!allApproved()} onChange={e => onChange(e, 'ResDate')} />
        </div>

        <div className='form__field'>
          <div className='form__label'>Visa Office</div>
          <select className='form__opt' name='visaOffice' value={visaOffice} disabled={!resDate || resDate === ''} onChange={e => onChange(e)}>
            <option value='N/A'>N/A</option>
            {visaoffices.visaOffices.map((office, index) => {
              return (
                <option key={office._id} value={office.location}>
                  {office.location}
                </option>
              )
            })}
          </select>
        </div>

        {/* Passport */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Passport </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <div className='form__label'>Date Sent</div>
          <input className='form__input' type='date' name='passDateSent' value={passDateSent} disabled={!resDate || resDate === ''} onChange={e => onChange(e)} />
        </div>

        <div className='form__field'>
          <div className='form__label'>Date Received</div>
          <input className='form__input' type='date' name='passDateReceived' value={passDateReceived} disabled={!resDate || resDate === ''} onChange={e => onChange(e)} />
        </div>
        <div className='form__field'>
          <div className='form__label'>VAC</div>
          <select name='passVac' className='form__opt' value={passVac} disabled={!resDate || resDate === ''} onChange={e => onChange(e)}>
            <option value='N/A'>N/A</option>
            {vacs.vacs.map(vac => {
              return (
                <option key={vac._id} value={vac.location}>
                  {vac.location}
                </option>
              )
            })}
          </select>
        </div>

        {/* Comments */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Comments </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <textarea className='form__input form__textarea' name='comments' rows='4' value={comments} onChange={e => onChange(e)}></textarea>
        </div>
        <div className='form__field'>
          <input type='submit' className='btn btn-grey form__btn' />
        </div>
      </form>
    </div>
  )
}

Application.propTypes = {
  getVisas: PropTypes.func.isRequired,
  getVacs: PropTypes.func.isRequired,
  getVisaOffices: PropTypes.func.isRequired,
  getCredentials: PropTypes.func.isRequired,
  createOrUpdateApplication: PropTypes.func.isRequired,
  getApplication: PropTypes.func.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  visas: PropTypes.object.isRequired,
  visaoffices: PropTypes.object.isRequired,
  vacs: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  visas: state.visas,
  application: state.application,
  visaoffices: state.visaoffices,
  vacs: state.vacs,
  credentials: state.credentials
})
export default connect(mapStateToProps, { getVisas, getVacs, getApplication, getVisaOffices, getCredentials, createOrUpdateApplication, deleteApplication })(Application)
