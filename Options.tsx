/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { SortableTableRows, IRowData } from '../sortableTableOnExample/SortableTableRows';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, TableContainer, TableBody, Table, TableHead, TextField, TableRow, TableCell, Select, InputLabel, SelectChangeEvent, MenuItem, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Options: React.FC = () => {
    const [rows, setRows] = useState<Array<IRowData>>([])
    const [users, setUsers] = useState<any[]>([])

    const DragIndicatorIconNode = <div style={{ display: 'flex', alignItems: 'center', cursor: 'move' }}>
        <DragIndicatorIcon style={{ marginRight: 8 }} /></div>

    useEffect( () => {
         fetchData()
    }, [])

    async function fetchData() {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                console.log(data)
            })
    }

    function onClickAddRow() {
        const textFieldArray = Array.from({ length: 7 }, (_, index) => ({
            node: <TextField key={index} sx={{ width: 100 }} variant='outlined'></TextField>,
            canDrag: false,
        }));
        const cells = [{
            node: DragIndicatorIconNode,
            canDrag: true
        }, ...textFieldArray]
        const newRow = {
            id: rows.length + 1,
            cells: cells
        }
        const newRows = [...rows, newRow];
        setRows(newRows)
    }

    const handleChange = (event: SelectChangeEvent) => {

    };

    return (
        <>
            <InputLabel id='user-select-label'>User</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="user"
                onChange={handleChange}
                sx={{ minWidth: 150 }}
            >

                {users.map((val,index) => (
                    <MenuItem value={val.name} key={index}>{val.name}</MenuItem>
                ))}
            </Select>


            <h1>Sortable Table</h1>
            <TableContainer>
                <Table sx={{ width: 1000, minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'>サック</TableCell>
                            <TableCell align='center'>sashi</TableCell>
                            <TableCell align='center'>kou</TableCell>
                            <TableCell align='center'>sagyouzi</TableCell>
                            <TableCell align='center'>iraimoto</TableCell>
                            <TableCell align='center'>作業</TableCell>
                            <TableCell align='center'>env</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <SortableTableRows rows={rows} />
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outlined' startIcon={<AddIcon />} onClick={onClickAddRow}>行を追加</Button>
        </>
    );
};

export default Options;
