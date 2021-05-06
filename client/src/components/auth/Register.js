import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// components
import Logo from '../general/Logo'

const Register = ({ auth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  if (auth.isAuthenticated) return <Redirect to='/dashboard' />
  return (
    <div className='auth'>
      <Logo classes='auth__logo' />
      <div className='auth__form'>
        <small className='auth__text'>Sign up to CAPermits</small>
        <form className='form'>
          <div className='form__field'>
            <label>
              Name
              <input type='text' className='form__input' />
            </label>
          </div>
          <div className='form__field'>
            <label>
              Email
              <input type='text' className='form__input' />
            </label>
          </div>
          <div className='form__field'>
            <label>
              Password
              <input type='text' placeholder='6+ characters' className='form__input' />
            </label>
          </div>
          <div className='form__field form__field--last'>
            <label>
              Confirm your password
              <input type='text' className='form__input' />
            </label>
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Register)
