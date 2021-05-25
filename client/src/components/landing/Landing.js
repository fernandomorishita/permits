import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Actions
import { getChartsQuery } from '../../actions/queries'

// Components
import Spinner from '../general/Spinner'
import PieChart from './PieChart'
import Responses from './Responses'
import BarChart from './BarChart'
import Averages from './Averages'

// Libraries
import { handleChartData } from '../../utils/library'

const Landing = ({ queries, getChartsQuery }) => {
  useEffect(() => {
    getChartsQuery()
  }, [])

  if (queries.isLoading) return <Spinner />

  const data = handleChartData(queries.applications ? queries.applications : null)

  return (
    <div className='landing'>
      <div className='data-display'>
        <Responses responses={data.responses} />
        <Averages database={data.averages} />
      </div>
      <div className='pies'>
        <PieChart database={data.applicationsChart} />
        <PieChart database={data.processedChart} />
        <PieChart database={data.awaitingChart} />
      </div>
      <div className='bars'>
        <BarChart database={data.processedDates} title='Processed by Application Year' divClass='medium bar__1' />
        <BarChart database={data.waitingDates} title='Waiting by Application Date' divClass='medium bar__2' />
      </div>
    </div>
  )
}

Landing.propTypes = {
  getChartsQuery: PropTypes.func.isRequired,
  visas: PropTypes.object.isRequired,
  queries: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  visas: state.visas,
  queries: state.queries
})

export default connect(mapStateToProps, { getChartsQuery })(Landing)
