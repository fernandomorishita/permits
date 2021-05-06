import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// components
import Logo from '../general/Logo'

const Login = ({ auth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  if (auth.isAuthenticated) return <Redirect to='/dashboard' />
  return (
    <div className='auth'>
      <Logo classes='auth__logo' />
      <div className='auth__form'>
        <small className='auth__text'>Sign in to CAPermits</small>
        <form className='form'>
          <div className='form__field'>
            <label>
              Email
              <input type='text' className='form__input' />
            </label>
          </div>
          <div className='form__field form__field--last'>
            <label>
              Password
              <input type='text' placeholder='6+ characters' className='form__input' />
            </label>
          </div>
          <input type='submit' className='form__btn btn' value='Sign in' />
        </form>
        <p className='auth__footer'>
          <small>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </small>
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Login)
