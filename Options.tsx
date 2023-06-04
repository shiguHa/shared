/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Button, Select, InputLabel, SelectChangeEvent, MenuItem, TextField } from '@mui/material';
import WorkLoadAutocompleteSetting from './WorkLoadAutocompleteSetting';
import SaveIcon from '@mui/icons-material/Save';
import TestWorkLoad from './TestWorkLoad';


const Options: React.FC = () => {
    const [users, setUsers] = useState<any[]>([])
    const [currentUser, setCurrentUser] = useState("")
    const [testInput, setTestInput] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json() as any)
            .then(json => {
                setUsers(json)
            })
    }


    const handleChange = (event: SelectChangeEvent) => {
        setCurrentUser(event.target.value as string)
    };

    return (
        <>
            <TextField id="1" value={testInput} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTestInput(event.target.value);
            }}></TextField>
            <InputLabel id='user-select-label'>User</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="user"
                value={currentUser}
                onChange={handleChange}
                sx={{ minWidth: 150 }}
            >
                {users.map((val, index) => (
                    <MenuItem value={val.name} key={index}>{val.name}</MenuItem>
                ))}
            </Select>
            {/* <WorkLoadAutocompleteSetting /> */}
            <TestWorkLoad></TestWorkLoad>
            <Button variant="contained" endIcon={<SaveIcon />}>保存</Button>

        </>
    );
};

export default Options;
