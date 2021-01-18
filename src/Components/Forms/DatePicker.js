import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import isWithinInterval from "date-fns/isWithinInterval";
import isSameDay from "date-fns/isSameDay";
import format from "date-fns/format";

import clsx from "clsx";
import { IconButton, withStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

import { Badge } from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import fetchPlace from '../../services/place';


/* const styles = createStyles(theme => ({
  dayWrapper: {
    position: "relative",
  },
  day: {
    width: 32,
    height: 32,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit",
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%",
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: "#676767",
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
})); */

export default function DatePicker(props) {

  const { id, label, onChange, sombrillaId, ...rest } = props;

  // The first commit of Material-UI
  const [rents, setRents] = useState(props.rents)
  const [selectedDate, setSelectedDate] = useState(props.value);
  const [selectedDays, setSelectedDays] = useState([]);
  const [sombrilla, setSombrilla] = useState('')
  
  const handleMonthChange = (date) => {
    setSelectedDays([])
    const month = date.getMonth();
    getDaysOfMonth(month)
  };

  const getDaysOfMonth = (month) => {

    var auxArray = [];

    if (!rents.length)
      setSelectedDays([]);
    else {
      rents.map(rent => {
        const fecha_inicial = new Date(rent.fecha_inicial);
        const fecha_final = new Date(rent.fecha_final);


        if (fecha_inicial.getMonth() == month) {

          for (var i = fecha_inicial.getDate(); i <= fecha_final.getDate(); i++) {
            auxArray.push(i);
          }

          setSelectedDays(auxArray)
        }
      })
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  useEffect(() => {

    if (sombrillaId) {
      setSombrilla(sombrilla)
      setRents(props.rents)
    }
  }, [])

  useEffect(() => {
    setSelectedDate(props.value)
    setSombrilla(sombrillaId)
    setRents(props.rents)

  }, [sombrillaId, props.rents])

  /* const renderDay = (date, isInCurrentMonth ,selectedDate, dayInCurrentMonth) => {

    const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());

    const classes = styles;

    const dayClassName = clsx(classes.day, {
      [classes.color]: isSelected ? '#ffffff' : '#000000'
    });

    return (
      <div >
        <IconButton className={dayClassName}>
          <span> {format(dateClone, "d")} </span>
        </IconButton>
      </div>
    );

  } */

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <Grid container justify="space-around">
        <KeyboardDatePicker  //Probar este tambien, es lindo.
          autoOk
          onOpen={() => getDaysOfMonth(selectedDate.getMonth())}
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id={id}
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={handleMonthChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          error = {props.error}
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {  //LLamar a renderDay para modificar el estilo
            const date = day; // skip this step, it is required to support date libs
            const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());

            // You can also use our internal <Day /> component
            return <Badge badgeContent={isSelected ? "R" : undefined} color ={isSelected ? 'error' : 'primary'} >{dayComponent}</Badge>;
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}