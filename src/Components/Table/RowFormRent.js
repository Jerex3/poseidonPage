import React, { useState, useEffect, Fragment } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import RestoreIcon from '@material-ui/icons/Restore';


import { ButtonGroup, Button, FormGroup, FormLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


import OpDate from '../Operations/Date';
import OpPrice from '../Operations/Price';

import TablePicker from "./TablePicker";
import DatePicker from '../Forms/DatePicker';
import fetchPlace from '../../services/place';

import fetchUser from '../../services/client';

import EffectTransparency from '../Animations/EffectTransparency.js'
import PopUpMessage from '../Forms/PopUpMessage';

import {addRent} from '../Operations/addingRents'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function RowFormRent(props) {

    const classes = useStyles();

    const {  handleAdding, selected, modifyRow, title, ...rest } = props;

    const [newRow, setNewRow] =
        useState({
            cliente: 'Ingrese Cliente',
            lugar: props.selectedPlace ? props.selectedPlace._id : 'Ingrese Lugar',
            fecha_inicial: Date.now(),
            fecha_final: Date.now() + 1,
        });

    const [newRowFront, setNewRowFront] =
        useState({
            cliente: 'Ingrese Cliente',
            lugar: props.selectedPlace ? props.selectedPlace.tipo : 'Ingrese Lugar',
            fecha_inicial: Date.now(),
            fecha_final: Date.now() + 1,
            _id: '',
            estacionamiento:''
        });

    const [newIngreso, setNewIngreso] = useState({ pago: '', total: '', parciales: '' });
    const [newIngresoParcial, setNewIngresoParcial] =
        useState({
            tipo_pago: '',
            pago: '',
            descripcion: ''
        });

    const [donePlace, setDonePlace] = useState(false);

    const [pickingUser, setPickingUser] = useState(false)
    const [pickingPlace, setPickingPlace] = useState(false)
    const [nameTable, setnameTable] = useState('')

    const [fetching, setFetching] = useState(false)
    const [errorCalculate, setErrorCalculate] = useState(false);

    const [pago, setPago] = useState(false)
    const [estacionamiento, setEstacionamiento] = useState(false)

    const [rentsOfPlace, setRentsOfPlace] = useState([])


    const togglePicking = (tabla, doneSelect) => {

        switch (tabla) {
            case 'Clientes': {

                setPickingUser(!pickingUser);
                doneSelect ? setnameTable('') : setnameTable(tabla)
                break;
            }

            case 'Sombrillas': {
                setPickingPlace(!pickingPlace);
                doneSelect ? setnameTable('') : setnameTable(tabla)
                break;
            }

            case 'Alquileres': {

                setFetching(false)
                setErrorCalculate(false)
                break;
            }

            default: break;
        }
    }

    const onClickUser = (event, client) => {

        setNewRow((prevState) => ({
            ...prevState,
            ['cliente']: client._id
        }))

        setNewRowFront((prevState) => ({
            ...prevState,
            ['cliente']: client.nombre + ' ' + client.apellido,
            ['_id']: client._id
        }))

        togglePicking(nameTable, true);
    }

    const onClickPlace = (event, place) => {
        setNewRow((prevState) => ({
            ...prevState,
            ['lugar']: place._id
        }))

        setNewRowFront((prevState) => ({
            ...prevState,
            ['lugar']: place.tipo,
            ['_id']: place._id
        }))

        setDonePlace(true);

        togglePicking(nameTable, true);
    }

    const handleDateEntry = (date) => {

        var dateSec = new Date(date)
        const dateString = OpDate.transformDate(dateSec);

        dateSec = dateSec.getTime()

        setNewRow((prevState) => ({
            ...prevState,
            ['fecha_inicial']: dateSec
        }))

        setNewRowFront((prevState) => ({
            ...prevState,
            ['fecha_inicial']: dateString
        }))
    };

    //console.log(props.selectedPlace)
    
    const handleDateOut = (date) => {

        var dateSec = new Date(date)
        const dateString = OpDate.transformDate(dateSec);

        dateSec = dateSec.getTime()

        setNewRow((prevState) => ({
            ...prevState,
            ['fecha_final']: dateSec
        }))

        setNewRowFront((prevState) => ({
            ...prevState,
            ['fecha_final']: dateString
        }))
    };

    const calculateInput = (event) => { //Estas funciones las podemos meter adentro de otro archivo mas especifico, porque this solo es formulario
        
        setNewIngreso({  total: '', parciales: '' })
        

            newIngresoParcial.descripcion = 'Alq' + newRowFront.lugar;

            const daysOfRent = OpDate.getCantDays(newRow.fecha_final, newRow.fecha_inicial);
            const pricePerDay = OpPrice.priceAccordingToDays(daysOfRent, newRowFront.lugar, props.pricesData);

            let costOfRent = daysOfRent * pricePerDay;
            const priceParking = 500
            if(estacionamiento) costOfRent += daysOfRent * priceParking   

            setNewIngreso({
                total: costOfRent,
                descripcion: 'Alq' + newRowFront.lugar
            })
            

    };

    const cleanInput = (event) => { // Este clean no esta terminado
        console.log("Clean no terminado xd");
    };

    const SelectTable = () => {
        switch (nameTable) {
            case 'Clientes':
                return (
                    <div style={{ marginTop: "7%" }} >
                        <TablePicker data={props.clientsData} title={nameTable} onClick={onClickUser}  getPage = {fetchUser.get} limit = {5} />
                    </div>
                )
                break;

            case 'Sombrillas':
                return (
                    <div style={{ marginTop: "7%" }} >
                        <TablePicker data={props.placesData} title={nameTable} onClick={onClickPlace} />
                    </div>
                )
                break;

            default: return <div />
                break;
        }
    };

    const handleSelect = (event) => {
        event.persist()
        setNewIngresoParcial((prevState) => ({
            ...prevState,
            ['tipo_pago']: event.target.value
        }))
    };

    const handleDescripcion = (event) => {
        event.persist()
        setNewIngresoParcial((prevState) => ({
            ...prevState,
            ['descripcion']: event.target.value
        }))
    };

    const handleParcial = (event) => {
        event.persist()

        if (event.target.value > newIngreso.total) {
            event.target.value = ''
        } else {
            setNewIngresoParcial((prevState) => ({
                ...prevState,
                ['pago']: event.target.value
            }))
        }
    };

    const handleAddData = () => {
    
    if(newRow.cliente != "Ingrese Cliente" && newRow.lugar != "Ingrese Lugar")
    {
         
    }
    console.log(newRow)
     // addRent(estacionamiento, pago, newRow, newIngreso, newIngresoParcial )
      //.then(handleAdding())
    }
    
    const getBodyMessage = () => {

        let BodyMessage = `Cliente: ${newRowFront.cliente} 
                           \n Desde: ${newRowFront.fecha_final}
                           \n Hasta: ${newRowFront.fecha_final}
                           \n En: ${newRowFront.lugar}
                           `;
        return BodyMessage;
    }

    const getPopUpMessage = (titleMessage, bodyMessage, modeMessage, responseTrue, responseFalse) => {
        return <EffectTransparency nameTable={title} toggleRenderComponent={togglePicking} >
            <PopUpMessage
                title={titleMessage}
                message={bodyMessage}
                mode={modeMessage}
                children={({ response }) => response ? responseTrue() : responseFalse(title, false)}
            />
        </EffectTransparency>
    }

    useEffect(() => {

        if(newRow.lugar != 'Ingrese Lugar')
        {       
            if (!OpDate.dateOverlap(newRow.fecha_inicial, newRow.fecha_final, newRow.lugar, rentsOfPlace)) {
                setErrorCalculate(false)
                calculateInput()
            } else {
                setErrorCalculate(true)
            }
        }


    }, [newRow.fecha_inicial, newRow.fecha_final, estacionamiento, rentsOfPlace ])

    useEffect(() => {
      console.log('me ejecute (?')
      if(newRow.lugar != "Ingrese Lugar")
      fetchPlace.getById(newRow.lugar)
      .then(dataRents => {
        setRentsOfPlace(dataRents)
      })
    }, [newRow.lugar])

    useEffect(() => {
        calculateInput()
    } , [rentsOfPlace])


    useEffect(() => {

        if (selected.length) {
            setNewRowFront({
                cliente: selected[0].cliente,
                lugar: selected[0].lugar,
                fecha_inicial: selected[0].fecha_inicial,
                fecha_final: selected[0].fecha_final,
                _id: selected[0]._id
            });

            setNewRow({
                cliente: selected[0].clienteId,
                lugar: selected[0].lugarId
            })
        }

    }, [])

    const handlePagoChecked = () => {
        setPago(!pago)
    }
    const handleEstacionamientoChecked = () => {
        setEstacionamiento(!estacionamiento)
    }
    return (
        <Fragment>
            {(pickingUser || pickingPlace) &&
                <EffectTransparency
                    children={SelectTable()}
                    nameTable={nameTable}
                    toggleRenderComponent={togglePicking}
                />
            }
            { fetching && getPopUpMessage("Deseas Continuar?", getBodyMessage(), "confirm", handleAddData, togglePicking)}
            {/*Se podria Usar la misma variable("advertising") y mismo metodo, pero dinamico*/}
            <TableRow >
                <TableCell align = 'left'>
                    Informacion general.
                </TableCell>
                <TableCell aling="left" >
                    <Button onClick={event => togglePicking('Clientes', false)} >{newRowFront.cliente}</Button>
                </TableCell>

                <TableCell aling="left" >
                    <Button disabled = {props.selectedPlace ? true : false} onClick={event => togglePicking('Sombrillas', false)} >{newRowFront.lugar}</Button>
                </TableCell>

                {((donePlace || selected.length)) ? (
                    <Fragment>
                        <TableCell align="left" >
                            <DatePicker
                                id="fecha_inicial"
                                label="fecha_inicial"
                                value={OpDate.stringToDate(newRowFront.fecha_inicial)}
                                onChange={handleDateEntry}
                                sombrillaId={newRow.lugar}
                                error = {errorCalculate}
                                rents = {rentsOfPlace}
                            />
                        </TableCell>
                        <TableCell align="left" >
                            <DatePicker
                                id="fecha_final"
                                label="fecha_final"
                                value={OpDate.stringToDate(newRowFront.fecha_final)}
                                onChange={handleDateOut}
                                sombrillaId={newRow.lugar}
                                error = {errorCalculate}
                                rents = {rentsOfPlace}

                            />
                        </TableCell>
                    </Fragment>
                ) : (
                <Fragment>
                <TableCell aling="left" ></TableCell>
                <TableCell aling="left" ></TableCell>
                </Fragment>
                )}

            </TableRow>
            
            <TableRow >
            <TableCell aling="left" >
            <FormControlLabel control = {<Checkbox/>} label = "Estacionamiento" checked = {estacionamiento} onChange={handleEstacionamientoChecked}></FormControlLabel>       
            </TableCell>
                <TableCell aling="left" >
                    <FormControlLabel  control = {<Checkbox disabled = {estacionamiento ? false : true}/> } label = 'Sombra'/>  
                </TableCell>
                <TableCell aling="left" >
                    <TextField
                        label="Descripcion"
                        name="Descripcion"
                        value={"Alq " + newRowFront.lugar}
                        disabled={estacionamiento ? false : true}
                        onChange={event => handleDescripcion(event)}
                    />
                </TableCell>
                <TableCell aling="left" ></TableCell>
                <TableCell aling="left" ></TableCell>
            </TableRow>

            <TableRow >
            <TableCell aling="left" >
            <FormControlLabel control = {<Checkbox/>} label = "Pago" checked = {pago} onChange={handlePagoChecked}></FormControlLabel>
            </TableCell>
                <TableCell aling="left" >
                    <FormControl className={classes.formControl}>
                        <InputLabel >Tipo Pago</InputLabel>
                        <Select value={newIngresoParcial.tipo_pago} onChange={event => handleSelect(event)} disabled={pago ? false : true}>
                            <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                            <MenuItem value={"Tarjeta"}>Tarjeta</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell aling="left" >
                    <TextField
                        label="Descripcion"
                        name="Descripcion"
                        value={"Alq " + newRowFront.lugar}
                        disabled={newIngreso.total && newIngresoParcial.tipo_pago && pago ? false : true}
                        onChange={event => handleDescripcion(event)}
                    />
                </TableCell>
                <TableCell aling="left" >
                    <TextField
                        helperText={"Max:" + newIngreso.total}
                        label="Parcial"
                        id="Parcial"
                        value={newIngresoParcial.parcial}
                        disabled={newIngreso.total && newIngresoParcial.tipo_pago && pago ? false : true} //guardar en una constante xq lo repito 3 veces
                        onChange={event => handleParcial(event)}
                    />
                </TableCell>
                <TableCell aling="left" ></TableCell>
                <TableCell aling="left" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                    <ButtonGroup color="secondary">
                        <Button
                            onClick={event => { if (selected.length) modifyRow(selected[0]._id, newRow); else setFetching(true) }}
                            disabled={(fetching || errorCalculate) ? true : false}
                        >
                            <Tooltip title="Aceptar" arrow>
                                <CheckIcon />
                            </Tooltip>
                        </Button>
                        <Button onClick={event => { handleAdding(event) }}>
                            <Tooltip title="Cancelar" arrow>
                                <ClearIcon />
                            </Tooltip>
                        </Button>
                        <Button onClick={event => { cleanInput(event) }}>
                            <Tooltip title="Limpiar" arrow>
                                <RestoreIcon />
                            </Tooltip>
                        </Button>
                    </ButtonGroup>
                    
                </TableCell>
            </TableRow>
        </Fragment>
    )
}