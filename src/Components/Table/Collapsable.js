import React from 'react';


import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import CollapsableDetail from './CollapsableDetail'


function EnhancedTableHead(props) {

  const { data, ...rest } = props;

  function GetKeys() {
    return Object.keys(data[0]);
  }

  function A() {
    var keys = GetKeys();
    var headerCell = new Array();
    keys.forEach(element => {
      if(!element.toLowerCase().includes("id") && element != "updatedAt"){
        headerCell.push({ id: element });
      }
    });
    return headerCell;
  }

  const headCells = A();
  return (
    <TableHead>
      <TableRow>

      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align="right"
        >
          {headCell.id}
        </TableCell>
      ))}
      </TableRow>
    </TableHead>
  );
}


export default function Collapsable(props) {

    const { details, title, open, index, ...rest } = props;

    const names = Object.keys(details[0]);

    return(
      <React.Fragment>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {title}
              </Typography>
              <Table size="small" aria-label="purchases">
                <EnhancedTableHead data={details} />
                  <TableBody>
                    <CollapsableDetail names={names} row={details} key={index} index={index}/>
                  </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      </React.Fragment>
    );
}
