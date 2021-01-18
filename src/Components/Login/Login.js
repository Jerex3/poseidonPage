import React from 'react'
import { useInputValue } from '../hooks/useInputValue'

export default function Login(props) {

    const { onSubmit, isLoginActive, handleLoading, ...rest} = props;

    const email = useInputValue('')
    const password = useInputValue('')

    const setLogin = (e) => {
        
        handleLoading();
        onSubmit(e,email,password)
    }

    const getClassNameLogin = () => {
        if (isLoginActive){
            return "login";
        }else{
            return "login hide";
        }
    }

    return (
        <form id={getClassNameLogin()} className="input-group">
            <input type="email" className="input-field" placeholder="Ingresa tu email" required {...email} />
            <input type="password" className="input-field" placeholder="Ingresa tu contraseña" required {...password} />
            <input type="checkbox" className="check-box" placeholder="User Id" />
            <span className="span-custom">Remember Password</span>
            <button type="submit" className="submit-btn" onClick={e => setLogin(e)}>Iniciar Sesion</button>
        </form>
    )
}
