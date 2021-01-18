import React, { useState, Fragment } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ButtonGroup, Button } from '@material-ui/core';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

//Internal

import EffectTransparency from '../Animations/EffectTransparency'
import PopUpMessage from '../Forms/PopUpMessage'

//--------------------------------------------------------------


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function RowFormEgresosParciales(props) {

    const classes = useStyles();

    const { names, row, handleAdding, selected, adding, addRow, modifyRow, title, ...rest } = props;

    const [fetching, setFetching] = useState(false)
    const [errorCalculate, setErrorCalculate] = useState(false)

    const [newRow, setNewRow] =
    useState({
        descripcion: '',
        pago: '',
        tipo_pago: '',
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

        if( event.target.value > selected[0].deuda ){ //Mejorar este sistema de mostrar el error
            event.target.value = 'Supera deuda'
        }else{
            setNewRow((prevState) => ({
                ...prevState,
                ['pago']: event.target.value
            }))
        }
    };

    const handleSelect = (event) => {
        event.persist()
        setNewRow((prevState) => ({
            ...prevState,
            ['tipo_pago']: event.target.value
        }))
    };

    const getBodyMessage = () => {

        let BodyMessage = `Ingreso Parcial: ${newRow.pago}
                           \n Tipo Pago: ${newRow.tipo_pago}
                           \n Descripcion: ${newRow.descripcion} 
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

    return (
        <Fragment>
            { fetching && getPopUpMessage("Deseas Continuar?", getBodyMessage(), "confirm", handleAddData, setFetching) }
            <TableRow>
               <TableCell>
                    <ButtonGroup color="secondary">
                        <Button onClick={event => { if (!adding) modifyRow(selected[0]._id, newRow); else setFetching(true)}}>
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

                <TableCell aling="left" >
                    <FormControl className={classes.formControl}>
                        <InputLabel >Tipo Pago</InputLabel>
                        <Select value={newRow.tipo_pago} onChange={ event => handleSelect(event) }>
                            <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                            <MenuItem value={"Tarjeta"}>Tarjeta</MenuItem>
                        </Select>
                        <FormHelperText>Método de pago</FormHelperText>
                    </FormControl>
                </TableCell>
                
                <TableCell align="left" >
                    <TextField 
                        id="descripcion" 
                        label="descripcion" 
                        value={newRow.descripcion} 
                        onChange={ (event) => handleDescripcion(event) } 
                        disabled={newRow.tipo_pago ? false : true}
                    />
                </TableCell>
                <TableCell align="left" >
                    <TextField 
                        id="pago" 
                        label="pago"
                        value={newRow.pago} 
                        onChange={ (event) => handlePago(event) } 
                        disabled={newRow.tipo_pago ? false : true} 
                        helperText={"Max:" + selected[0].deuda}
                    />
                </TableCell>

                <TableCell align="left" >
                    <TextField id="fecha_creacion" label="fecha_cracion" value="Hoy" disabled />
                </TableCell>
            </TableRow>

        </Fragment>
    )
}