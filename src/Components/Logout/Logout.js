import React, { useState, useEffect, Fragment } from 'react'
import '../../styles/Logout.scss'

import fetchUser from '../../services/user'

import { Redirect } from 'react-router-dom';

import Context from '../../Context'

export const Logout = (props) => {

    const { onClick } = props;

    const [render, setRender] = useState(false)

    const [welcome, setWelcome] = useState('')

    const handleClick = (event, message) => {
        const r = confirm(message);
        if (r) {
            onClick();
        }
    }

    const handleUmbrella = (event) => {
        if (event){
            setRender(true);
        }
    }

    useEffect(() => {
        
        let tokenUser = localStorage.getItem('x-token');
        console.log(tokenUser);
        fetchUser.getUserByToken(tokenUser)
        .then(res => {
            const user = res.userToken.email;
            setWelcome('Hola ' + user);
        })
        .catch(err => "Usuario no identificado")

    }, [welcome])

    

    return (

        <Context.Consumer>
            {
                ({ toggleSettings }) => {

                    {
                        if (render){
                            toggleSettings()
                            return <Redirect to="/prices" />
                        }
                    }
 
                    return  <Fragment>
                            <div className="container-head" >
                                {welcome && <h2>{welcome}</h2>}
                            </div>
                            <div className="container-foot" >
                                <button onClick={event => handleClick(event,"Deseas salir?")}>Cerrar Sesión</button>
                            </div>
                            <div className="container-config" >
                                <h2>Configuraciones</h2>
                                <button onClick={event => handleUmbrella(event)}>Precio sombrillas</button>
                                <button onClick={event => console.log("Ejemplo: cambiar colores a las row de ingresos (deudas)")}>Acomodá tu workspace</button>
                                <button onClick={event => console.log("Ideas sobre que renderizar")}>Ideas</button>
                            </div>
                        </Fragment>
                    
                }
            }
        </Context.Consumer>

    )
}


