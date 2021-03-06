import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getChartsQuery } from '../../actions/queries'
import Spinner from '../general/Spinner'
import Table from './Table'
import { Link } from 'react-router-dom'

import SelectColumnFilter from './SelectColumnFilter'

const Database = ({ queries: { applications, isLoading }, getChartsQuery, history }) => {
  useEffect(() => {
    const axiosRequest = axios.CancelToken.source()
    getChartsQuery(axiosRequest)
    return () => {
      axiosRequest.cancel()
    }
  }, [])

  function nameCell(row) {
    return <Link to={`/application/${row.row.values._id}`}>{row.value}</Link>
  }
  const data = useMemo(() => applications)
  const columns = useMemo(() => [
    {
      Header: 'Application',
      columns: [
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
          Header: 'Name',
          accessor: 'user_id.name',
          Cell: nameCell
        },
        {
          Header: 'Application Date',
          accessor: 'date.date'
        },
        {
          Header: 'Status',
          accessor: 'status',
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Visas',
          //accessor: 'visas',
          accessor: data => {
            let output = data.applicants.map(applicant => {
              return applicant.visa_type
            })

            let unique = output.filter((value, index, self) => self.indexOf(value) === index)

            return output.join(', ')
          },
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Total Time (weeks)',
          accessor: 'procWeeks'
        },
        {
          Header: 'Online/Paper',
          accessor: 'type',
          Filter: SelectColumnFilter,
          filter: 'includes'
        }
      ]
    },
    {
      Header: 'College',
      columns: [
        {
          Header: 'Name',
          accessor: 'college.name'
        },
        {
          Header: 'Credential',
          accessor: 'college.credential',
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Public/Private',
          accessor: 'college.type',
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Intake',
          accessor: 'college.intake',
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'AIP',
          accessor: 'college.has_aip',
          Filter: SelectColumnFilter,
          filter: 'includes'
        },
        {
          Header: 'Started',
          accessor: 'college.started_online',
          Filter: SelectColumnFilter,
          filter: 'includes'
        }
      ]
    },
    {
      Header: 'Response',
      columns: [
        {
          Header: 'Date',
          accessor: 'response.date'
        },
        {
          Header: 'Office',
          accessor: 'response.visaoffice',
          Filter: SelectColumnFilter,
          filter: 'includes'
        }
      ]
    },
    {
      Header: 'Passport',
      columns: [
        {
          Header: 'Date Sent',
          accessor: 'passport.date_sent'
        },
        {
          Header: 'Date Received',
          accessor: 'passport.date_received'
        },
        {
          Header: 'to VAC',
          accessor: 'passport.vac'
        },
        {
          Header: 'Wait Time (weeks)',
          accessor: 'passWeeks'
        }
      ]
    },
    {
      Header: 'Biometrics (main)',
      columns: [
        {
          Header: 'Date',
          accessor: 'applicants[0].biometrics.date'
        }
      ]
    },
    {
      Header: 'Medicals (main)',
      columns: [
        {
          Header: 'Approval Date',
          accessor: 'applicants[0].medical.date'
        }
      ]
    },
    {
      Header: 'Other',
      columns: [
        {
          Header: 'Consultant',
          accessor: 'consultant.name'
        }
      ]
    }
  ])

  if (isLoading) {
    return <Spinner />
  }

  if (applications === null) return <div>Error reading data.</div>

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
