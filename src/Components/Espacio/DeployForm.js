import React, { useState, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import RowFormRent from '../Table/RowFormRent'

function DeployForm(props) {

    const { data, renderDeploy, index, checkClick, checkMouseOver, onLeaveForm, ...rest } = props;



    const getClassNameDeployForm = () => {

        var clase = "";

        if (renderDeploy) {
            if (onLeaveForm)
                clase = "container-deploy-form open transparency";
            else
                clase = "container-deploy-form open";
        } else {
            return "container-deploy-form"
        }

        return clase;
    }

    const getClassNameDeploy = () => {
        if (renderDeploy) {
            return "content-info-umbrella open"
        } else {
            return "content-info-umbrella";
        }
    }
    

    const useStyles = makeStyles((theme) => ({
        root: {
            width: 750,
        },
        paper: {
            width: 750,
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },


    }));
    const classes = useStyles();


    //Hacer un context de alquileres ? ya que usamos la informacion acá como tambien en la tabla de alquileres, se cargaria una sola vez en vez de dos
    //hariamos el consumer aca y en table rents para obtener la info //tips

    //const inquilino = data.rent[0].cliente;
    //const rent = data.rent[0];
    //const pago = data.rent[0].pago;
    return (
        data.rent[0] ? (
            <div className={getClassNameDeployForm()} onClick={(event) => checkClick(event)} onMouseOver={(event) => checkMouseOver(event)} >
                <div className={getClassNameDeploy()} >
                    <div className="ball-1" />
                    <div className="ball-2" />
                    <p>{data.tipo}</p>
                    <div className="info-umbrella" >
                        <h2 className="time-ago">{data.rent[0].cantDays}</h2>
                        <h1>Tipo: {data.tipo}</h1>
                        <h1 className="format-pesos">{data.rent[0].pago.deuda}</h1>
                    </div>
                    <div className="info-usuario" >
                        <h2>Inquilino</h2>
                        <h1>{data.rent[0].cliente.nombre + " " + data.rent[0].cliente.apellido}</h1>
                        <h1>{data.descripcion}</h1>
                        <h1>{data.recordatorio}</h1>
                        {/* <input type="text" className="input-field" placeholder="Algun recordatorio" onChange={(event) => changeInput(event)}/> */}
                    </div>
                    <h1 className="allowed-people">Jeremias Manuel | Agustin Massa | Joaco Mastropierro | Paula Mancino | Mailen Fioravanti | Benjamin Figeiredo</h1>
                </div>
            </div>
        ) : (
                <div className={getClassNameDeployForm()} onClick={(event) => checkClick(event)} onMouseOver={(event) => checkMouseOver(event)} >
                    <div className = "total">
                        <div className="conten-rowForm">
                            <Fragment>
                                <div className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <TableContainer>
                                            <Table
                                                className={classes.table}
                                                aria-labelledby="tableTitle"
                                                size='medium'
                                                aria-label="enhanced table"                                >
                                                <RowFormRent selected={[]} clientsData = {props.clients} pricesData = {props.prices} selectedPlace = {data}/>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </div>
                            </Fragment>
                        </div>
                    </div>
                </div>
            )
    )
}

export default DeployForm;
