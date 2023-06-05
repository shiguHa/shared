import update from 'immutability-helper'
import { FC, useEffect } from 'react'
import { useCallback, useState } from 'react'

import { SortableTableRow } from './SortableTableRow'
import React from 'react'


export interface ICellData {
  children: React.ReactNode
  canDrag: boolean
}
export interface IRowData {
  id: number
  cells: ICellData[];
}

export interface ISortableTableProps {
  rows: IRowData[],
  onRowReorder?: (rows: IRowData[]) => void
}

export const SortableTableRows: FC<ISortableTableProps> = (props) => {
  const [data, setData] = useState(props.rows)

  useEffect(() => {
    setData(props.rows)
  }, [props.rows])

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevState) => {
      console.log(prevState)
      const updatedData = update(prevState, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevState[dragIndex]],
        ],
      });

      props.onRowReorder && props.onRowReorder(updatedData)
      return updatedData
    });
  }, [setData, props.onRowReorder])


  const renderRow = useCallback(
    (card: IRowData, index: number) => {
      return (
        <SortableTableRow
          key={card.id}
          index={index}
          id={card.id}
          cells={card.cells}
          moveRow={moveRow}
        />
      )
    },
    [],
  )

  console.log('render SortableTableRows', data)
  return (
    <>
      {data.map((card, i) => renderRow(card, i))}
    </>
  )
};

