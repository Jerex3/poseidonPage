import React, { useState, Fragment } from 'react'

import { Redirect } from 'react-router-dom'

import '../../styles/EmailForm.scss';


import fetchSendEmail from '../../services/SendEmail';


import { useInputValue } from '../hooks/useInputValue'
import Context from '../../Context'

import { PdfForm } from '../Pdf/PdfForm'

export const EmailForm = (props) => {


    const { body, ...rest } = props;

    const [render, setRender] = useState(true)

    const destino = useInputValue(body.destino);

    const asunto = useInputValue(body.asunto);

    const mensaje = useInputValue('');

    const handleRender = () => {
        setRender(!render);
    }

    const sendEmail = (event) => {

        event.persist()
        event.preventDefault();

        const body = JSON.stringify({
            destino: destino.value,
            asunto: asunto.value,
            mensaje: mensaje.value
        })
        fetchSendEmail.post(body)
        .then(res => {
            console.log("Email enviado")
        })
        .catch(err => {
            console.log("Hubo un error al enviar el mail" + err)
        })
        
    }

    return (
        <Context.Consumer>
            {
                ({ desactivateEmail }) => {
                    {
                        if (!render) {
                            desactivateEmail()
                            return <Redirect to="/" />
                        }
                    }
                    return <Fragment>
                  
                        <form className="input-email-group" >
                            <p>Email</p>
                            <input className="input-email" {...destino} name="destino"/>
                            <p>Asunto</p>
                            <input className="input-email" {...asunto} name="asunto"/>
                            <p>Mensaje</p>
                            <textarea className="input-email" {...mensaje} name="mensaje"/>
                            <button classname = "" onClick={event => sendEmail(event)}>Enviar mensaje</button>
                            <button className ="backButton" onClick={handleRender}>Cancelar</button>

                        </form>
                        <PdfForm data={body.data}/>

                    </Fragment>
                }
            }
        </Context.Consumer>



    )
}
