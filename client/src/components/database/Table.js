import React, { Fragment } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import ColumnFilter from './ColumnFilter'

export default function Table({ columns, data, rowProps = () => ({}) }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter
    }),
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data, defaultColumn, initialState: { hiddenColumns: ['_id'] } }, useFilters, useSortBy)

  return (
    <Fragment>
      <table className='database__table' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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
