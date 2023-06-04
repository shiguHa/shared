/** @jsxImportSource @emotion/react */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { SortableTableRows, IRowData, ICellData } from '../sortableTableOnExample/SortableTableRows';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, TableContainer, TableBody, Table, TableHead, TextField, TableRow, SxProps, TableCell } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid'

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


const WorkLoadAutocompleteSetting: React.FC = () => {
    // const initialValues = Array(10).fill('').map(() => Array(10).fill(''));
    const [rows, setRows] = useState<Array<IRowData>>([])
    const [textFieldValues, setTextFieldValues] = useState<string[]>(Array(7).fill(''));
    const [testInput, setTestInput] = useState("")

    const DragIndicatorIconNode = <div style={{ display: 'flex', alignItems: 'center', cursor: 'move' }}>
        <DragIndicatorIcon style={{ marginRight: 8 }} /></div>

    useEffect(() => {
        // fetchData()
        const rows: IRowData[] = [
            {
                id: 1,
                cells: [
                    {
                        canDrag: true,
                        children: <TextField id="1" value={testInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setTestInput(event.target.value);
                        }}></TextField>
                    }
                ]
            }
        ]
        

    }, [])

    async function fetchData() {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json() as any)
            .then(json => {
                // @ts-ignore
                // const newValues = json.map((val, index) => {
                //     const workLoadItem: IWorkLoadItem = {
                //         sakku: val.id,
                //         sashizu: val.name,
                //         koutei: val.username,
                //         sagyouzikan: val.address.zipcode,
                //         iraimoto: val.address.suite,
                //         sagyounaiyou: val.email,
                //         enviromentCode: "",
                //     }
                //     return  workLoadItem 
                // })

                json = json.slice(0, 1)
                // @ts-ignore
                const datas = json.map((val, index) => {
                    const colArray: string[] = []
                    colArray.push(val.id)
                    colArray.push(val.name)
                    colArray.push(val.username)
                    colArray.push(val.address.zipcode)
                    colArray.push(val.address.suite)
                    colArray.push(val.email)
                    colArray.push("")
                    return colArray
                })
                createRows(datas)

            })
    }

    function createRows(datas: string[][]) {
        const rows = datas.map((val, index) => {
            const row: IRowData = {
                id: index,
                cells: createCells(index, val)
            }
            return row;
        })
        setRows(rows)
    }

    function createCells(rowIndex: number, columns: string[]) {
        const result = columns.map((val, index) => {
            const uuid = uuidv4()
            const cell = {
                children: <input id={uuid} key={uuid} value={textFieldValues[rowIndex]}
                    onChange={(event) => onChangeTextField({ row: rowIndex, col: index }, event.target.value)} ></input>,
                canDrag: true
            }
            return cell
        })
        return result
    }

    function textFieldArray(rowIndex: number, workLoadItem?: IWorkLoadItem) {

        const list = [
            {
                type: 'sakku',
                sx: { width: 50 } as SxProps,
                inputProps: { maxLength: 1 }
            },
            {
                type: 'sashizu',
                sx: { width: 100 } as SxProps,
                inputProps: { maxLength: 3 }
            },
            {
                type: 'koutei',
                sx: { width: 100 } as SxProps,
                inputProps: { maxLength: 3 }
            },
            {
                type: 'sagyouzikan',
                sx: { width: 100 } as SxProps,
                inputProps: { maxLength: 4 }
            },
            {
                type: 'iraimoto',
                sx: { width: 100 } as SxProps,
                inputProps: { maxLength: 5 }
            },
            {
                type: 'sagyounaiyou',
                sx: { width: 100 } as SxProps,
                inputProps: { maxLength: 30 }
            },
            {
                type: 'enviromentCode',
                sx: { width: 100 } as SxProps,
                inputProps: { maxLength: 3 }
            },

        ]

        return list.map((val, index) => {
            // @ts-ignore
            const text = workLoadItem ? workLoadItem[val.type] : ""
            const uuid = uuidv4()
            return {
                children: <TextField id={uuid} key={uuid} sx={val.sx} variant='outlined' defaultValue={text} onChange={(event) => onChangeTextField({ row: rowIndex, col: index }, event.target.value)}></TextField>,
                canDrag: false,
            }
        })
    }

    function cells(rowIndex: number, workLoadItem?: IWorkLoadItem) {
        return [{
            children: DragIndicatorIconNode,
            canDrag: true
        }, ...textFieldArray(rowIndex, workLoadItem)]
    }

    // テキストフィールドの値が変更されたときのハンドラー
    const onChangeTextField = useCallback((index: IRowColIndex, value: string) => {
        setTextFieldValues((prevValues) => {
            const updatedValues = prevValues.map((row, rowIndex) => {
                return rowIndex === index.row ? value : row
            });
            console.log(updatedValues)
            return updatedValues;
        });
    }, []);

    function onClickAddRow() {
        const newIndex = rows.length + 1;
        const newRow = {
            id: newIndex,
            cells: cells(newIndex)
        }
        const newRows = [...rows, newRow];
        setRows(newRows)
    }

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

        //1列目を削除する。
        const columnIndexToRemove = 0
        const workLoadDatas = rowDatas.map(row => {
            return row.filter((_, index) => index !== columnIndexToRemove);
        });
        console.log(workLoadDatas)

    }, [])


    console.log('render WorkLoad')
    return (
        <>
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
                        <SortableTableRows rows={rows} onRowReorder={handleRowReorder} />
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outlined' startIcon={<AddIcon />} onClick={onClickAddRow}>行を追加</Button>
        </>
    );
};

export default WorkLoadAutocompleteSetting;