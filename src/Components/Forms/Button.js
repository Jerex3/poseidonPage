import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'green',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    buttonBlue: {
      background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .30)',
    },
  };

  export default function ButtonStyled() {
    const [color, setColor] = React.useState('default');

    const chubbyStyles = useGradientBtnStyles({ chubby: true });
  
    const handleChange = (event) => {
      setColor(event.target.checked ? 'blue' : 'default');
    };

    const mouseEntry = (event) => {
        setColor(event.target.chubby ? 'default' : 'blue');
    }
    const mouseOut = (event) => {
        setColor(event.target.chubby ? 'blue' : 'default');
    }
  
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Switch
              checked={color === 'blue'}
              onChange={handleChange}
              color="primary"
              value="dynamic-class-name"
            />
          }
          label="Blue"
        />
        <Button
          style={{
            ...styles.button,
            ...(color === 'blue' ? styles.buttonBlue : {}),
          }} classes={chubbyStyles} startIcon={<DeleteIcon />} onMouseEnter={mouseEntry} onMouseLeave={mouseOut}
        >
          {'Delete User'}
        </Button>
      </React.Fragment>
    );
  }