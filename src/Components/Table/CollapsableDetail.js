import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function CollapsableDetail(props){
    
    const { row, names, index, ...rest } = props;

    return(
        
        row.map((element,indexEl) => {
         return(
          <TableRow key={indexEl} index={index} onClick={(event => console.log("Opcion en el table head de agregar nuevo parcial con index: " + index))} >
            <TableCell key={"descripcion" + index} align="right" >
                {element.descripcion}
            </TableCell>
            <TableCell key={"pago" + index} align="right" >
                {element.pago}
            </TableCell>
            <TableCell key={"tipo_pago" + index} align="right" >
                {element.tipo_pago}
            </TableCell>
            <TableCell key={"fecha_creacion" + index} align="right" >
                {element.fecha_creacion}
            </TableCell>
          </TableRow>
         )
        })
          
    )
}