import React from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'

const BarChart = ({ database, title, divClass }) => {
  const options = {
    plugins: {
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center'
      }
    },
    indexAxis: 'x',
    scales: {
      yAxes: [
        {
          stacked: true
        }
      ],
      xAxes: [
        {
          stacked: true
        }
      ]
    }
  }

  return (
    <div className={`bar ${divClass}`}>
      <div className='bar__title'>{title}</div>
      <Bar data={database} options={options} />
    </div>
  )
}

BarChart.propTypes = {}

const mapStateToProps = state => ({})
export default connect()(BarChart)
