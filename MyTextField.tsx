import * as React from 'react';
import TextField from '@mui/material/TextField';

interface IMyTextField {
  value: string,
  onChange: React.ChangeEvent<HTMLInputElement>
}
// @ts-ignore
export default function MyTextField(props) {
  return (
    <>
      <TextField
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}