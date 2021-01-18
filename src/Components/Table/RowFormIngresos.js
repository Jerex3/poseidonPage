import React, { useState, Fragment, useEffect } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ButtonGroup, Button } from '@material-ui/core';

//Internal

import EffectTransparency from '../Animations/EffectTransparency'
import PopUpMessage from '../Forms/PopUpMessage'

//--------------------------------------------------------------

export default function RowFormIngresos(props) {

    const { names, row, handleAdding, selected, addRow, modifyRow, title, ...rest } = props;

    
    const [newRow, setNewRow] =
        useState({
            total: '',
            descripcion: '',
            deuda: 0,
            fecha_creacion: Date.now()
        });

    const [fetching, setFetching] = useState(false)
    const [errorCalculate, setErrorCalculate] = useState(false)

  
    const handleDescripcion = (event) => {
        event.persist()
        setNewRow((prevState) => ({
            ...prevState,
            ['descripcion']: event.target.value
        }))

    };

    const handleTotal = (event) => {
        event.persist()
        setNewRow((prevState) => ({
            ...prevState,
            ['total']: event.target.value
        }))

    };

    const getBodyMessage = () => {

        let BodyMessage = `Ingreso Total: ${newRow.total}
                           \n Razon: ${newRow.descripcion} 
                           \n Dia: ${newRow.fecha_creacion}
                           `;
        return BodyMessage; 
    }

    const getPopUpMessage = (titleMessage, bodyMessage, modeMessage, responseTrue, responseFalse) => {
        return <EffectTransparency nameTable={title} toggleRenderComponent={togglePicking} >
                    <PopUpMessage 
                        title={titleMessage}
                        message={bodyMessage}
                        mode={modeMessage} 
                        children={ ({response}) => response ? responseTrue() : responseFalse(false)}
                    />
                </EffectTransparency>
    }

    const togglePicking = (nameTable, doneSelect) => {
        setFetching(false)
    }

    const handleAddData = () => {

        addRow(newRow)
    }

    useEffect(() => {

        if(selected.length)
        {
            setNewRow({total:selected[0].total,
                       descripcion:selected[0].descripcion,
                       deuda:selected[0].deuda,
                       fecha_creacion:selected[0].fecha_creacion })
        }

    }, [])

    return (
        <Fragment>
            { fetching && getPopUpMessage("Deseas Continuar?", getBodyMessage(), "confirm", handleAddData, setFetching) } 
            <TableRow>
                <TableCell>
                    <ButtonGroup color="secondary">
                        <Button onClick={event => { if (selected.length) modifyRow(selected[0]._id, newRow); else setFetching(true) }}>
                            <Tooltip title="Accept" arrow>
                                <CheckIcon />
                            </Tooltip>
                        </Button>
                        <Button onClick={event => { handleAdding(event) }}>
                            <Tooltip title="Cancel" arrow>
                                <ClearIcon />
                            </Tooltip>
                        </Button>
                    </ButtonGroup>
                </TableCell>
            
                <TableCell align="left" >
                    <TextField id="alquiler" name="alquiler" label="alquiler"  value="Sin alquiler" disabled />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="descripcion" name="descripcion" label="descripcion"  value={newRow.descripcion} onChange={ event => handleDescripcion(event) } />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="total" label="total" name="total" value={newRow.total} onChange={ event => handleTotal(event) } />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="deuda" label="deuda" name="deuda" value={newRow.deuda} disabled />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="fecha_creacion" label="fecha_creacion" name="fecha_creacion" value={newRow.fecha_creacion} disabled />
                </TableCell>

            </TableRow>
        </Fragment>
    )
}