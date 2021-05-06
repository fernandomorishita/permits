import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import setAuthToken from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Components
import Navbar from './components/navbar/Navbar'
import MobileMenu from './components/mobile/menu/MobileMenu'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className='page-container'>
            <Navbar />
            <section className='content-container'>
              <MobileMenu />
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </section>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
