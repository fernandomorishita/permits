import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { chartColors } from '../../utils/defines'

const PieChart = ({ database }) => {
  const data = {
    labels: database.labels,
    datasets: [
      {
        label: 'My First Dataset',
        backgroundColor: chartColors,
        data: database.data
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    },
    cutout: '80%',
    layout: {
      padding: 0
    }
  }

  return (
    <div className='wrapper__pie'>
      <div className='pie'>
        <div className='pie__chart'>
          <Doughnut data={data} options={options} />
        </div>
        <div className='pie__label'>{database.total}</div>
        <div className='pie__sublabel'>{database.title}</div>
      </div>
    </div>
  )
}

export default PieChart
