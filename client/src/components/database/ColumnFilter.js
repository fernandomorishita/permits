import React from 'react'

const ColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  //const count = preFilteredRows.length
  return (
    <input
      className='db-filter'
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search records...`}
    />
  )
}

export default ColumnFilter
