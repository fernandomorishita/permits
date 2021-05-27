import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getChartsQuery } from '../../actions/queries'
import Spinner from '../general/Spinner'
import Table from './Table'
import moment from 'moment'

const Database = ({ queries: { applications, isLoading }, getChartsQuery, history }) => {
  useEffect(() => {
    const axiosRequest = axios.CancelToken.source()
    getChartsQuery(axiosRequest)
    return () => {
      axiosRequest.cancel()
    }
  }, [])

  const data = useMemo(() => applications)
  const columns = useMemo(() => [
    ,
    {
      Header: ' ',
      Cell: ({ row }) => {
        return <div>{row.index + 1}</div>
      }
    },
    {
      Header: 'ID',
      accessor: '_id'
    },
    {
      Header: 'Date',
      accessor: 'date.date'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'Visas',
      //accessor: 'visas',
      accessor: data => {
        let output = []
        data.applicants.map(applicant => {
          output.push(applicant.visa_type)
        })
        return output.join(', ')
      }
    },
    {
      Header: 'Consultant',
      accessor: 'consultant.name'
    },
    {
      Header: 'Weeks',
      accessor: 'weeks'
    }
  ])

  if (isLoading || (applications !== null && applications.length == 0)) {
    return <Spinner />
  }

  if (applications === null) return <div></div>

  return (
    <div className=''>
      <div className='database'>
        <Table data={data} columns={columns} />
      </div>
    </div>
  )
}

Database.propTypes = {
  getChartsQuery: PropTypes.func.isRequired,
  queries: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  queries: state.queries
})
export default connect(mapStateToProps, { getChartsQuery })(Database)
