import React, { useCallback, useEffect, useState } from 'react';
import { SortableTableRows, ISortableTableProps } from './SortableTableRows';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TableContainer, TableBody, Table, TableHead, TextField, Button } from '@mui/material';
import update from 'immutability-helper'




const UsageSortableTable: React.FC = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        // @ts-ignore
        setData(rowDatas())
    }, [])

    const remove = useCallback((rowId:number) => {
        setData((prevState) => {
            console.log(prevState)
            // const updatedData = update(prevState, {
            //   $splice: [
            //     [dragIndex, 1],
            //     [hoverIndex, 0, prevState[dragIndex]],
            //   ],
            // });
  
            return prevState
          });
      }, [setData]);

    function rowDatas() {

        return [
            {
                id: 1,
                cells: [
                    {
                        children: <div style={{ display: 'flex', alignItems: 'center', cursor: 'move' }}>
                            <DragIndicatorIcon style={{ marginRight: 8 }} /></div>,
                        canDrag: true
                    },
                    {
                        children: <TextField></TextField>,
                        canDrag: false
                    },
                    {
                        children: <TextField></TextField>,
                        canDrag: false
                    },
                ],
            },
            {
                id: 2,
                cells: [
                    {
                        children: <div style={{ display: 'flex', alignItems: 'center', cursor: 'move' }}>
                            <DragIndicatorIcon style={{ marginRight: 8 }} /></div>,
                        canDrag: true
                    },
                    {
                        children: <TextField></TextField>,
                        canDrag: false
                    },
                    {
                        children: <TextField></TextField>,
                        canDrag: false
                    },
                ],
            },
            {
                id: 3,
                cells: [
                    {
                        children: <div style={{ display: 'flex', alignItems: 'center', cursor: 'move' }}>
                            <DragIndicatorIcon style={{ marginRight: 8 }} /></div>,
                        canDrag: true
                    },
                    {
                        children: <TextField></TextField>,
                        canDrag: false
                    },
                    {
                        children:  <Button onClick={()=>remove(3)}>削除</Button>,
                        canDrag: false
                    },
                ],
            },
        ];
    }

    return (
        <>
            <h1>Sortable Table</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        {/* ヘッダー行のコンポーネントをここに追加 */}
                    </TableHead>
                    <TableBody>
                        <SortableTableRows rows={data} />
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UsageSortableTable;
