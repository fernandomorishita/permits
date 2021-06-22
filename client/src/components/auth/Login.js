import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// Components
import Logo from '../general/Logo'

// Actions
import { login } from '../../actions/auth'

const Login = ({ auth, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  if (auth.isAuthenticated) return <Redirect to='/dashboard' />

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    login(email.toLowerCase(), password)
  }
  return (
    <div className='auth'>
      <Logo classes='auth__logo' />
      <div className='auth__form'>
        <small className='auth__text'>Sign in to CAPermits</small>
        <form onSubmit={e => onSubmit(e)} className='form'>
          <div className='form__field'>
            <div className='form__label form__label--bold'>Email</div>
            <input type='text' name='email' className='form__input' onChange={e => onChange(e)} required />
          </div>
          <div className='form__field form__field--last'>
            <div className='form__label form__label--bold'>Password</div>
            <input type='password' name='password' placeholder='6+ characters' className='form__input' onChange={e => onChange(e)} required />
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
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(Login)
