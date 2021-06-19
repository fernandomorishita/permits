import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import Spinner from '../general/Spinner'

// Actions
import { getVisaOffices } from '../../actions/visaoffices'

const ProcessApplication = ({ application: { application }, visaoffices, getVisaOffices }) => {
  useEffect(() => {
    getVisaOffices()
  }, [])

  const [formData, setFormData] = useState({
    resDate: '',
    result: '',
    office: ''
  })

  const { resDate, result, office } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = e => {
    e.preventDefault()
    //processApplication(formData, history)
  }

  if (visaoffices.isLoading) return <Spinner />

  return (
    <div className='process'>
      <form className='form'>
        <div className='form__field'>
          <div className='form__label form__label--bold'>Response date </div>
          <input className='form__input' type='date' name='resDate' value={resDate} onChange={e => onChange(e)} />
        </div>
        <div className='form__field'>
          <div className='form__label form__label--bold'>Result </div>

          <select className='form__opt' name='result' value='Approved' onChange={e => onChange(e)}>
            <option value='Approved'>Approved</option>
            <option value='Denied'>Denied</option>
          </select>
        </div>
        <div className='form__field'>
          <div className='form__label form__label--bold'>Applicants </div>
          {application.applicants.map((applicant, index) => {
            return (
              <div key={index}>
                {applicant.type}
                <select className='form__opt' name='result' value='Approved' onChange={e => onChange(e)}>
                  <option value='Approved'>Approved</option>
                  <option value='Denied'>Denied</option>
                </select>
              </div>
            )
          })}
        </div>
        <div className='form__field'>
          <div className='form__label form__label--bold'>Visa Office </div>

          <select className='form__opt' name='office' onChange={e => onChange(e)}>
            <option value='none'>Choose One</option>
            {visaoffices.visaOffices !== null &&
              visaoffices.visaOffices.map((office, index) => {
                return (
                  <option key={index} value={office.location}>
                    {office.location}
                  </option>
                )
              })}
          </select>
        </div>
      </form>
    </div>
  )
}

ProcessApplication.propTypes = {
  application: PropTypes.object.isRequired,
  visaoffices: PropTypes.object.isRequired,
  getVisaOffices: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ application: state.application, visaoffices: state.visaoffices })

export default connect(mapStateToProps, { getVisaOffices })(ProcessApplication)
