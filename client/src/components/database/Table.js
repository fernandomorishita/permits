import React, { useState, Fragment } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'

export default function Table({ columns, data, rowProps = () => ({}) }) {
  const [filterInput, setFilterInput] = useState('')
  const handleFilterChange = e => {
    const value = e.target.value || undefined
    setFilter('profilename', value) // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value)
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = useTable({ columns, data, initialState: { hiddenColumns: ['_id'] } }, useFilters, useSortBy)

  return (
    <Fragment>
      <input className='database__filter' value={filterInput} onChange={handleFilterChange} placeholder={'Search name'} />
      <table className='database__table' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr className='database__row' {...row.getRowProps(rowProps(row))}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Fragment>
  )
}
