/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

// import TextField from '@material-ui/core/TextField'

const Input = withStyles(theme => ({
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

export default function(props) {
  const { label, onChange, disabled, value } = props;
  return (
    <InputLabel htmlFor="age-customized-select">
      {label}：
      <Input value={value} disabled={disabled} onChange={onChange} />
      {/* <TextField
        id="outlined-name"
        label="Name"
        // className={classes.textField}
        // value={this.state.name}
        // onChange={this.handleChange('name')}
        margin="normal"
        variant="outlined"
      /> */}
    </InputLabel>
  );
}
