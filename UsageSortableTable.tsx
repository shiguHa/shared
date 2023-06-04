import React from 'react';
import { SortableTableRows, ISortableTableProps } from './SortableTableRows';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TableContainer, TableBody, Table, TableHead,TextField } from '@mui/material';

const UsageSortableTable: React.FC = () => {

    const rowDatas = [
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
                    children: <TextField></TextField>,
                    canDrag: false
                },
            ],
        },
    ];

    return (
        <>
            <h1>Sortable Table</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        {/* ヘッダー行のコンポーネントをここに追加 */}
                    </TableHead>
                    <TableBody>
                        <SortableTableRows rows={rowDatas} />
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UsageSortableTable;
