import React, { useEffect } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Details from './Collapsable.js';
import moment from 'moment'

import { lighten, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//Internal

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



export default function Row(props) {

  const { id, row, parcialesData, index, names, isItemSelected, title, ...rest } = props;

  const [open, setOpen] = React.useState(false);

  const withoutDeuda = row.deuda;

  const deudaColor = withoutDeuda !== 0 ? lighten("#f73378", 0.7) : lighten("#81c784", 0.7)

  const deudaColorWithoutOpacity = withoutDeuda ? lighten("#f73378", 0.4) : lighten("#81c784", 0.4)

  const selectColor = "#ffffff"

  const styles = makeStyles({

    tableRow: {
      "&$selected, &$hover:hover": {
        backgroundColor: deudaColorWithoutOpacity,
      },
      background: deudaColor,
    },
      hover: {},
      selected: {},
    })

  const classes = styles();

  return (

    <React.Fragment>
      <TableRow
        hover
        classes={{ hover: classes.hover, selected: classes.selected }}
        className={classes.tableRow}
        onClick={(event) => props.handleClick(event, row, index)}
        tabIndex={-1}
        key={index}
        id={index}
        selected={isItemSelected}
        /* style={ row.deuda !== 0 
              ? {backgroundColor : lighten("#f73378", 0.7)} //rojo
              : {backgroundColor : lighten("#81c784", 0.7)} //verde
        } */
      >
        <TableCell>

          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>

        </TableCell>

        {names.map((element, index) => {
          if (element != "_id" && element != "fecha_modificacion") {
            return (
              <TableCell
                align="left"
                key={names[index].toString()}
              >
                {row[element]}
              </TableCell>
            )
          }
        })}
      </TableRow>

      { (parcialesData[index].length != 0) &&
        <Details open={open} details={parcialesData[index]} title={title + " Parciales"} index={index} />
      }
    </React.Fragment>

  );
}