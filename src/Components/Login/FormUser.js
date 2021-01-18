import React, { useState } from 'react'
import Context from '../../Context'

import UserForm from './GlobalSession';

import fetchUser from '../../services/user';


export const FormUser = () => {

    const [isLogged, setIsLogged] = useState(false); //creo que esto da un warning

    const checkLogin = (event, email, password) => {
        event.preventDefault()
    
        const body = JSON.stringify({
            email: email.value, password: password.value
        })
    
        if(email.value && password.value){
            fetchUser.signIn(body)
            .then(response => {
                const token = response.token;
                localStorage.setItem('x-token', token)
                setIsLogged(true)
            })
        }
    }
    
    const checkRegister = (event, email, password, passwordR) => {
        event.preventDefault()
    
        const body = JSON.stringify({
            email: email.value,password: password.value
        })
    
        if(email.value && password.value){
            fetchUser.signUp(body)
            .then(response => {
                const token = response.token;
                localStorage.setItem('r-token', token)
            })
        }
    }

    return(

    <Context.Consumer>
        {
            ({ isAuth, activateAuth }) => {
                {
                    if(isLogged){
                        activateAuth();
                    }
                }
                return <UserForm onLogin={checkLogin} onRegister={checkRegister} />
            }
        }
    </Context.Consumer>
    )

}