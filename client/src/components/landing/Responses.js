import React from 'react'

export const Responses = ({ responses }) => {
  return (
    <div className='wrapper__data'>
      <div className='data'>
        <div className='data__title'>Recent Processes</div>
        <div className='data__flex'>
          <div className='data__item'>
            <div className='data__subtitle'>Today</div>
            <div className=''>{responses.today}</div>
          </div>
          <div className='data__item'>
            <div className='data__subtitle'>Last 7 days</div>
            <div className=''>{responses.week}</div>
          </div>
          <div className='data__item'>
            <div className='data__subtitle'>Last 30 days</div>
            <div className=''>{responses.month}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Responses
