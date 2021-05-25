import React from 'react'

const Averages = ({ database }) => {
  return (
    <div className='wrapper__data'>
      <div className='data'>
        <div className='data__title'>Average Processing Time</div>
        <div className='data__flex'>
          {database.map((avg, index) => {
            return (
              <div key={index} className='data__item'>
                <div className='data__subtitle'>{avg.year}</div>
                <div className=''>{avg.avg} weeks</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Averages
