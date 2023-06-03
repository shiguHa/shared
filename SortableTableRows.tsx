import update from 'immutability-helper'
import { FC, useEffect } from 'react'
import { useCallback, useState } from 'react'

import { SortableTableRow } from './SortableTableRow'

export interface IRowData {
  id: number
  cells: { node: React.ReactNode, canDrag: boolean }[];
}

export interface ISortableTableProps {
  rows: IRowData[]
}

export const SortableTableRows: FC<ISortableTableProps> = (props) => {
  const [data, setData] = useState(props.rows)

  useEffect( () => {
    setData(props.rows)
  },[props.rows])

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevState) => {
      return update(prevState, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevState[dragIndex]],
        ],
      });
    });
  }, [])

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

  return (
    <>
      {data.map((card, i) => renderRow(card, i))}
    </>
  )
}

