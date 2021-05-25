import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// Components
import Logo from '../general/Logo'

// Actions
import { register } from '../../actions/auth'

const Register = ({ auth, register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      console.log('hi')
      //setAlert('Passwords do not match.', 'danger')
    } else {
      register(name, email, password)
    }
  }

  if (auth.isAuthenticated) return <Redirect to='/' />
  return (
    <div className='auth'>
      <Logo classes='auth__logo' />
      <div className='auth__form'>
        <small className='auth__text'>Sign up to CAPermits</small>
        <form onSubmit={e => onSubmit(e)} className='form'>
          <div className='form__field'>
            <div className='form__label form__label--bold'>Name</div>
            <input type='text' name='name' className='form__input' onChange={e => onChange(e)} required />
          </div>
          <div className='form__field'>
            <div className='form__label form__label--bold'>Email</div>
            <input type='text' name='email' className='form__input' onChange={e => onChange(e)} required />
          </div>
          <div className='form__field'>
            <div className='form__label form__label--bold'>Password</div>
            <input type='password' name='password' placeholder='6+ characters' className='form__input' onChange={e => onChange(e)} required />
          </div>
          <div className='form__field form__field--last'>
            <div className='form__label form__label--bold'>Confirm you password</div>
            <input type='password' name='password2' className='form__input' onChange={e => onChange(e)} required />
          </div>
          <input type='submit' className='form__btn btn' value='Create Account' />
        </form>
        <p className='auth__footer'>
          <small>
            Already have an account? <Link to='/login'>Sign In</Link>
          </small>
        </p>
      </div>
    </div>
  )
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { register })(Register)
