import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { getVisas } from '../../actions/visas'

const Landing = ({ getVisas }) => {
  useEffect(() => {
    getVisas()
  }, [])

  return <div>Landing</div>
}

Landing.propTypes = {
  getVisas: PropTypes.func.isRequired,
  visas: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  visas: state.visas
})
export default connect(mapStateToProps, { getVisas })(Landing)
