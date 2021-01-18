import React, { useState, Fragment } from 'react'

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/Send';

import { Redirect } from 'react-router-dom'

import Context from '../../Context'

import fetchClient from '../../services/client'
import fetchRent from '../../services/rent'

export const ButtonRedirect = (props) => {

    const { request, selected, handleEmailContent, ...rest } = props; 

    const [proceeds, setProceeds] = useState(false)

   const data = selected[0];

    const toggleProceeds = () => {
        setProceeds(!proceeds);
    }

    const bodyEmail = (destinoP, asuntoP) => {
        const body = {
            destino: destinoP,
            asunto: asuntoP,
            data: data
        }
        return body;
    }

    const handleDataCliente = () => {
        const asunto = 'Querido ' + data.nombre + ' ' + data.apellido;
        const body = bodyEmail(data.email, asunto)
        handleEmailContent(body);
    }

    const getEmailAlquiler = (txtI, txtF, info) => {
        var destino;
        console.log(data);
        fetchRent.getEmail(data.alquiler)
        .then(res => {
            destino = res.cliente.email
            const body = bodyEmail( destino, txtI + info + txtF )
            handleEmailContent(body)
        })
        .catch(err => {
            console.log(err);
        })
    }
    const getEmailCliente = (txtI, txtF, info) => {
        var destino;
        fetchClient.getById(data.clienteId)
        .then(res => {
            destino = res.email
            const body = bodyEmail( destino, txtI + info + txtF)
            handleEmailContent(body)
        })
        .catch(err => {
            console.log(err);
        })
    }

    //txtI y txtF en un futuro serán editables por cada Usuario, con un cap de 6 textos default.

    const handleDataAlquiler = () => {
        getEmailCliente('Tuvimos un reclamo por la ', ', gracias por prestar atencion!', data.lugar) //Aca estaria bueno mostrar el recordatorio/reclamo
    }

    const handleDataIngreso = () => {
        getEmailAlquiler('Te recordamos la deuda de $', ' pesos', data.deuda);
    }

    /* const handleDataEgreso = () => {
        const destino = getEmailAlquiler()
        const body = bodyEmail( destino, 'Te recordamos que te debemos $' + data.deuda + ' pesos')
        handleEmailContent(body)
    } */

    const selectRequest = (event) => {

        switch (request) {
            case 'Clientes':
                handleDataCliente();
                
                break;
            case 'Alquileres':
                handleDataAlquiler();
                
                break;
            case 'Ingresos':
                handleDataIngreso();
                
                break;
            /* case 'Egresos':
                handleDataEgreso();
                
                break; */
            default:
                console.log("No has seleccionado ninguna tupla de la tabla")
                break;
        }

    }

    return (
        <Fragment>
            <Context.Consumer>
                {
                    ({ activateEmail }) => {

                        {
                            if (proceeds) {
                                selectRequest()
                                activateEmail()
                                return <Redirect to="/sendemail" />
                            }
                        }

                        return < Tooltip title="Enviar Mensaje" arrow >
                            <IconButton onClick={event => toggleProceeds()} >
                                <SendIcon />
                            </IconButton>
                        </Tooltip >
                    }
                }
            </Context.Consumer>
        </Fragment>

    )
}
