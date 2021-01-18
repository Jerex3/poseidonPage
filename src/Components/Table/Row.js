import React from 'react';

//Components
    //External
    import TableRow from '@material-ui/core/TableRow';
    import TableCell from '@material-ui/core/TableCell';
    import Checkbox from '@material-ui/core/Checkbox';
    import Tooltip from '@material-ui/core/Tooltip';
    //Internal

export default function Row(props){

    const { id, row, index, names, isItemSelected, ...rest } = props;

    const labelId = `enhanced-table-checkbox-${index}`;

    return(
            <TableRow
            hover
            onClick={(event) => props.handleClick(event, row, index)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={index}
            id={index}
            selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Tooltip title="Select" arrow>
                    <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </Tooltip>
              </TableCell>

              {names.map((element,index) => {
                if(!element.toLowerCase().includes("id") || element == 'apellido'){
                   return <TableCell align="left" key={names[index].toString()}>{row[element]}</TableCell>
                }
              })}
            </TableRow>
    );
}