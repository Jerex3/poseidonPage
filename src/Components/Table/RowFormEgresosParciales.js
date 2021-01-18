import React, { useState, useEffect } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ButtonGroup, Button } from '@material-ui/core';

import Operation from '../Operations/Date';

//--------------------------------------------------------------

export default function RowFormEgresosParciales(props) {

    const { names, row, handleAdding, selected, adding, title,
        addRowParcial, modifyRow, ...rest } = props;

    const [newRow, setNewRow] =
    useState({
        descripcion: '',
        pago: '',
        tipo_pago: 'Efectivo',
        fecha_creacion: Date.now()
    });


    const handleDescripcion = (event) => {
        event.persist();
        setNewRow((prevState) => ({
            ...prevState,
            ['descripcion']: event.target.value
        }))

    };

    const handlePago = (event) => {
        event.persist();
        setNewRow((prevState) => ({
            ...prevState,
            ['pago']: event.target.value
        }))

    };

    return (
        <>

            <TableRow>
               <TableCell>
                    <ButtonGroup color="secondary">
                        <Button onClick={event => { if (!adding) modifyRow(selected[0]._id, newRow); else console.log(newRow)}}>
                            <Tooltip title="Accept" arrow>
                                <CheckIcon />
                            </Tooltip>
                        </Button>
                        <Button onClick={event => handleAdding(event)} >
                            <Tooltip title="Cancel" arrow>
                                <ClearIcon />
                            </Tooltip>
                        </Button>
                    </ButtonGroup>
                </TableCell>
                
                <TableCell align="left" >
                    <TextField id="descripcion" label="descripcion" value={newRow.descripcion} onChange={ (event) => handleDescripcion(event) } />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="pago" label="pago" value={newRow.pago} onChange={ (event) => handlePago(event) } />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="tipo_pago" label="tipo_pago" value="Efectivo/Tarjeta" disabled />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="fecha_creacion" label="fecha_cracion" value="Por Defecto" disabled />
                </TableCell>
            </TableRow>

        </>
    )
}