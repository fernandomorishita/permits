import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Applicants = ({ visas: { visas }, applicant, index, formData, setFormData }) => {
  // Deconstruct applicants for manipulation
  let { applicants } = formData

  const handleRemoveAppl = (e, index) => {
    // Remove specific applicant from state array
    applicants.splice(index, 1)
    setFormData({ ...formData, applicants })
  }

  const onChange = (e, index, field) => {
    switch (field) {
      case 'visa':
        const childIndex = e.target.selectedIndex
        const el = e.target.childNodes[childIndex]
        const dataId = el.getAttribute('data-id')
        applicants[index].visa_type = e.target.value
        applicants[index].visa_id = dataId
        break
      case 'status':
        applicants[index].status = e.target.value
        if (e.target.value !== 'Approved' && applicants[index].response && applicants[index].response.date) applicants[index].response.date = ''
        break
      case 'type':
        applicants[index].type = e.target.value
        break
      case 'medDate':
        applicants[index].medical.date = e.target.value
        break
      case 'isUpfront':
        applicants[index].medical.is_upfront = e.target.value
        break
      case 'bioDate':
        applicants[index].biometrics.date = e.target.value
        break
      case 'resDate':
        if (!applicants[index].response) applicants[index].response = {}
        applicants[index].response.date = e.target.value
        break
      default:
        break
    }
    setFormData({ ...formData, applicants })
  }

  const copyResponse = e => {
    e.preventDefault()
    applicants = applicants.map((appl, index) => {
      if (index !== 0) {
        appl.status = applicants[0].status
        if (!appl.reponse && applicants[0].response && applicants[0].response.date) {
          appl.response = {}
          appl.response.date = applicants[0].response.date
        }
      }
      return appl
    })
    setFormData({ ...formData, applicants })
  }
  return (
    <div className='form__applicant'>
      <div className='form__flex form__flex--justify'>
        {applicant.type !== 'Main' ? (
          <Fragment>
            <div className='form__field'>
              <input type='text' className='form__short' value={applicant.type} onChange={e => onChange(e, index, 'type')} />
            </div>
            <i onClick={e => handleRemoveAppl(e, index)} className='fas fa-ban form__icon'></i>
          </Fragment>
        ) : (
          <div className='form__label'>{applicant.type}</div>
        )}
      </div>
      <div className='form__field'>
        <div className='form__flex'>
          <select className='form__opt' name='visas' id='' value={applicant.visa_type} onChange={e => onChange(e, index, 'visa')}>
            <option value='Permit'>Permit</option>
            {visas.map(visa => {
              return (
                <option key={visa._id} data-id={visa._id} value={visa.type}>
                  {visa.type}
                </option>
              )
            })}
          </select>
          <div className='form__padding'></div>
          <select className='form__opt' value={applicant.status} onChange={e => onChange(e, index, 'status')}>
            <option value='Status'>Status</option>
            <option value='Waiting'>Awaiting</option>
            <option value='Approved'>Approved</option>
            <option value='Denied'>Denied</option>
          </select>
        </div>
      </div>
      <div className='form__field'>
        <div className='form__label'>Medical date (approval)</div>
        <div className='form__flex'>
          <input className='form__short' type='date' value={applicant.medical.date} onChange={e => onChange(e, index, 'medDate')} />
          <div className='form__padding'></div>
          <select className='form__opt' name='' id='' value={applicant.medical.is_upfront} onChange={e => onChange(e, index, 'isUpfront')}>
            <option value='Requested'>Requested</option>
            <option value='Upfront'>Upfront</option>
          </select>
        </div>
      </div>
      <div className='form__field'>
        <div className='form__label'>Biometrics date </div>
        <input className='form__short' type='date' value={applicant.biometrics.date} onChange={e => onChange(e, index, 'bioDate')} />
      </div>
      <div className='form__field'>
        <div className='form__label'>Response date </div>
        <input className='form__short' type='date' value={applicant.response ? applicant.response.date : ''} disabled={applicant.status !== 'Approved'} onChange={e => onChange(e, index, 'resDate')} />
      </div>

      {applicant.type === 'Main' ? (
        <div className='form__field'>
          <div className='form__label'>Copy response for all applicants </div>
          <input className='btn btn-grey form__short' type='button' value='Copy' disabled={applicant.status !== 'Approved'} onClick={e => copyResponse(e)} />
        </div>
      ) : (
        ''
      )}
      <div className='form__section-label'>
        <div className='form__separator form__separator--dashed'></div>
      </div>
    </div>
  )
}

Applicants.propTypes = {
  visas: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  visas: state.visas
})
export default connect(mapStateToProps)(Applicants)
