import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import setAuthToken from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Components
import Landing from './components/landing/Landing'
import Navbar from './components/navbar/Navbar'
import MobileMenu from './components/mobile/menu/MobileMenu'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Charts from './components/charts/Charts'
import Database from './components/database/Database'
import Dashboard from './components/dashboard/Dashboard'
import Application from './components/application/Application'
import PrivateRoute from './components/routing/PrivateRoute'
import ProcessApplication from './components/process/ProcessApplication'
import ViewApplication from './components/application/ViewApplication'

// Actions
import { loadUser } from './actions/auth'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className='page-container'>
            <Navbar />
            <MobileMenu />
            <section className='content'>
              <Route exact path='/' component={Landing} />
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/charts' component={Charts} />
                <Route exact path='/database' component={Database} />
                <Route exact path='/application/:id' component={ViewApplication} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/application' component={Application} />
                <PrivateRoute exact path='/process-application' component={ProcessApplication} />
              </Switch>
            </section>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
