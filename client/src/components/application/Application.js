import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { getVisas } from '../../actions/visas'
import { getApplication, createOrUpdateApplication } from '../../actions/application'
import { getVisaOffices } from '../../actions/visaoffices'
import { getVacs } from '../../actions/vacs'

// Components
import Applicant from './Applicant'
import Spinner from '../general/Spinner'

const Application = ({ visas: { visas }, application, visaoffices, vacs, getVisas, getVacs, createOrUpdateApplication, getApplication, getVisaOffices, history }) => {
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
    getApplication()

    let formFields = {}
    if (application.application) {
      formFields = {
        applDate: application.application.date.date,
        applType: application.application.type,
        applicants: application.application.applicants,
        consultantName: application.application.consultant.name,
        college: collegeData,
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
        passVac: ''
      }
    }

    setFormData(formFields)
  }, [application.isLoading])

  useEffect(() => {
    getVisaOffices()
  }, [])
  const { applDate, applType, applicants, consultantName, comments, resDate, visaOffice, passDateSent, passDateReceived, passVac } = formData

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
  if (visas === null) return <div></div>

  if (application.isLoading) {
    return <Spinner />
  }

  if (visaoffices.isLoading || visaoffices.visaOffices === null) {
    return <Spinner />
  }

  if (vacs.vacs.isLoading || vacs === null) {
    return <Spinner />
  }
  return (
    <div className='content--pw application'>
      <form onSubmit={e => onSubmit(e)} className='form'>
        {/* Application */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Application </div>
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
          return <Applicant key={index} applicant={appl} index={index} formData={formData} setFormData={setFormData} />
        })}
        <div className='form__field'>
          <div onClick={e => handleAddAppl(e)} className=''>
            <i className='fas fa-plus'></i> Add Applicant
          </div>
        </div>

        {/* Consultant */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Consultant </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <input className='form__input' type='text' name='consultantName' value={consultantName} onChange={e => onChange(e)} />
        </div>

        {/* Comments */}
        <div className='form__section-label'>
          <div className='form__label form__label--bold'>Comments </div>
          <div className='form__separator'></div>
        </div>
        <div className='form__field'>
          <textarea className='form__input form__textarea' name='comments' rows='4' value={comments} onChange={e => onChange(e)}></textarea>
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
          <input className='form__input' type='date' name='resDate' value={resDate} onChange={e => onChange(e, 'ResDate')} />
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
  createOrUpdateApplication: PropTypes.func.isRequired,
  getApplication: PropTypes.func.isRequired,
  visas: PropTypes.object.isRequired,
  visaoffices: PropTypes.object.isRequired,
  vacs: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  visas: state.visas,
  application: state.application,
  visaoffices: state.visaoffices,
  vacs: state.vacs
})
export default connect(mapStateToProps, { getVisas, getVacs, getApplication, getVisaOffices, createOrUpdateApplication })(Application)
