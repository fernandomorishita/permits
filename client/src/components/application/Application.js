import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { getVisas } from '../../actions/visas'
import { getApplication, createOrUpdateApplication } from '../../actions/application'

// Components
import Applicant from './Applicant'
import Spinner from '../general/Spinner'

const Application = ({ visas: { visas }, application, getVisas, createOrUpdateApplication, getApplication, history }) => {
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
    applicants: [{ ...applData, type: 'Main' }],
    consultant: {
      name: ''
    },
    college: collegeData
  })

  // useEffects
  useEffect(() => {
    getVisas()
  })

  useEffect(() => {
    getApplication()

    let formFields = {}
    if (application.application) {
      formFields = {
        applDate: application.application.date.date,
        applicants: application.application.applicants,
        consultantName: application.application.consultant.name,
        college: collegeData
      }
    } else {
      formFields = {
        applDate: '',
        applicants: [{ ...applData, type: 'Main' }],
        consultantName: '',
        college: collegeData
      }
    }

    setFormData(formFields)
  }, [application.isLoading])

  const { applDate, applicants, consultantName } = formData

  const handleAddAppl = (e, index) => {
    applicants.push({ ...applData, type: 'Other' })
    setFormData({ ...formData, applicants })
  }

  const onChange = e => {
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
  return (
    <div className='content--pw application'>
      <form onSubmit={e => onSubmit(e)} className='form'>
        <div className='form__field'>
          <div className='form__label form__label--bold'>Application date </div>
          <input className='form__input' type='date' name='applDate' value={applDate} onChange={e => onChange(e)} />
        </div>
        <div className='form__field'>
          <div className='form__label form__label--bold'>Applicants</div>
        </div>
        {applicants.map((appl, index) => {
          return <Applicant key={index} applicant={appl} index={index} formData={formData} setFormData={setFormData} />
        })}
        <div onClick={e => handleAddAppl(e)} className=''>
          <i className='fas fa-plus'></i> Add Applicant
        </div>
        <div className='form__separator form__separator--last'></div>
        <div className='form__field form__field--last'>
          <div className='form__label form__label--bold'>Consultant </div>
          <input className='form__input' type='text' name='consultantName' value={consultantName} onChange={e => onChange(e)} />
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
  createOrUpdateApplication: PropTypes.func.isRequired,
  getApplication: PropTypes.func.isRequired,
  visas: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  visas: state.visas,
  application: state.application
})
export default connect(mapStateToProps, { getVisas, getApplication, createOrUpdateApplication })(Application)
