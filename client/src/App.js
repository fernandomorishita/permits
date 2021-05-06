import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import setAuthToken from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Components
import Navbar from './components/navbar/Navbar'

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
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
