/** @jsxImportSource @emotion/react */
import React, { ReactElement, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SortableTableRows, IRowData, ICellData } from '../sortableTableOnExample/SortableTableRows';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, TableContainer, TableBody, Table, TableHead, TextField, TableRow, SxProps, TableCell, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete';

interface IWorkLoadItem {
    sakku: string,
    sashizu: string,
    koutei: string,
    sagyouzikan: string,
    iraimoto: string,
    sagyounaiyou: string,
    enviromentCode: string
}

interface IRowColIndex {
    row: number,
    col: number
}

interface IWorkLoadItemRow {
    rows: IRowData,
    inputValues: IWorkLoadItem
}


const DragIndicatorIconNode = <div style={{ display: 'flex', alignItems: 'center', cursor: 'move' }}>
    <DragIndicatorIcon style={{ marginRight: 8 }} /></div>

const WorkLoadAutocompleteSetting: React.FC = () => {
    // const initialValues = Array(10).fill('').map(() => Array(10).fill(''));
    const [rows, setRows] = useState<Array<IRowData>>([])
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        fetchData()
    }, [])

    useEffect (() => {
        console.log(rows)
    },[rows])

    // @ts-ignore
    const onSubmit = (data) => console.log(data)

    async function fetchData() {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json() as any)
            .then(json => {
                // @ts-ignore
                const newWorkLoadItem = json.map((val, index) => {
                    const workLoadItem: IWorkLoadItem = {
                        sakku: val.id,
                        sashizu: val.name,
                        koutei: val.username,
                        sagyouzikan: val.address.zipcode,
                        iraimoto: val.address.suite,
                        sagyounaiyou: val.email,
                        enviromentCode: "",
                    }
                    return workLoadItem
                }) as IWorkLoadItem[]

                const rows = newWorkLoadItem.map((item, index) => {
                    const row: IRowData = {
                        id: index,
                        cells: createCells(index, item)
                    }
                    return row
                })
                setRows(rows)
            })
    }


    function createCells(rowId: number, workLoadItem: IWorkLoadItem) {
        const result = Object.keys(workLoadItem).map((val, index) => {
            const uuid = uuidv4()
            const cell = {
                // @ts-ignore
                children: <TextField id={uuid} key={uuid} defaultValue={workLoadItem[val]} {...register(`${rowId}_${val}`)}></TextField>,
                canDrag: false
            }
            return cell
        })
        // ドラッグのアイコンを先頭に追加
        result.unshift({ canDrag: true, children: DragIndicatorIconNode })
        //　削除ボタンを最後に追加
        result.push({
            canDrag: false, children:
                <IconButton aria-label="delete" onClick={() => handleRemoveClick(rowId)}>
                    <DeleteIcon />
                </IconButton>
        })
        return result
    }


    const handleAddRowClick = useCallback(() => {
        console.log(rows)
        const workLoadItem: IWorkLoadItem = {
            sakku: "",
            sashizu: "",
            koutei: "",
            sagyouzikan: "",
            iraimoto: "",
            sagyounaiyou: "",
            enviromentCode: "",
        }
        const newIndex = rows.length + 1;
        const newRow = {
            id: newIndex,
            cells: createCells(newIndex, workLoadItem)
        }
        const newRows = [...rows, newRow];
        setRows(newRows)
    }, [])

    // 行を削除
    const handleRemoveClick = useCallback((rowId: number) => {
        console.log(rowId, rows)
        const newRows = rows.filter( item => item.id !== rowId);
        console.log(newRows)
        setRows(newRows)

    }, [])

    // useCallBack
    const handleRowReorder = useCallback((rows: IRowData[]) => {
        const rowDatas: string[][] = []
        for (const row of rows) {
            const cellDatas: string[] = []
            for (const cell of row.cells) {
                const node = cell.children as ReactElement
                cellDatas.push(node.props.value)
            }
            rowDatas.push(cellDatas)
        }
        console.log(rows)
        //1列目を削除する。
        const columnIndexToRemove = 0
        const workLoadDatas = rowDatas.map(row => {
            return row.filter((_, index) => index !== columnIndexToRemove);
        });
    }, [])


    console.log('render WorkLoad')
    return (
        <>
            <h1>Sortable Table</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div ref={bodyRef}> */}
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
                        <TableBody >
                            <SortableTableRows rows={rows} onRowReorder={handleRowReorder} />
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAddRowClick}>行を追加</Button>
                <Button type='submit'>登録</Button>
                {/* </div> */}
            </form>
        </>
    );
};

export default WorkLoadAutocompleteSetting;