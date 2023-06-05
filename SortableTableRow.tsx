import type { Identifier, XYCoord } from 'dnd-core'
import React, { FC, useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { Button, SxProps, TableCell, TableRow,Theme } from '@mui/material'
import { ICellData } from './SortableTableRows'

const rowDefaultSxProps = {

} as const

export interface ISortableTableRow {
  id: any
  index: number
  cells: ICellData[]
  moveRow: (dragIndex: number, hoverIndex: number) => void
  rowSx?: SxProps<Theme>
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const SortableTableRow: FC<ISortableTableRow> =({ id, cells, index, moveRow, rowSx }) => {
  const ref = useRef<HTMLTableRowElement>(null)
  const [canDrag, setCanDrag] = useState(false)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // マウスがアイテムの高さの半分を超えた場合にのみ移動を実行します
      // 下にドラッグする場合、カーソルが 50% 未満の場合にのみ移動します
      // 上にドラッグする場合、カーソルが 50% を超えている場合にのみ移動します
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // 行移動
      moveRow(dragIndex, hoverIndex)

      // Note: ここではモニター項目を変更してる。
      // 一般に、突然変異は避けたほうが良いが、
      // コストのかかるインデックス検索を避けるためのパフォーマンスの観点
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: canDrag
  })

  const opacity = isDragging ? 0 : 1
  const sxProp = rowSx || rowDefaultSxProps 
  drag(drop(ref))

  console.log('render row',id,cells)
  return (
    <TableRow ref={ref} style={{ opacity }} data-handler-id={handlerId} sx={sxProp}>
      {cells.map((cell, colIndex) => (
        <TableCell
          key={colIndex}
          onMouseEnter={() => {
            if (cell.canDrag) {
              setCanDrag(true)
            }
          }}
          onMouseLeave={() => {
            if (cell.canDrag) {
              setCanDrag(false)
            }
          }}
        >
          {cell.children}
        </TableCell>
      ))}
    </TableRow>
  )
}
