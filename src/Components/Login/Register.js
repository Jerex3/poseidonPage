import React from 'react'
import { useInputValue } from '../hooks/useInputValue'

function Register(props) {

    const { onSubmit, isLoginActive, handleLoading, ...rest} = props;

    const email = useInputValue('');
    const password = useInputValue('');
    const passwordRepeat = useInputValue('');

    const getClassNameRegister = () => {
        if (isLoginActive){
            return "register hide";
        }else{
            return "register";
        }
    }

    return (
        <form id={getClassNameRegister()} className="input-group" >
            <input type="email" className="input-field" placeholder="Enter Email" required {...email} />
            <input type="password" className="input-field" placeholder="Enter Password" required {...password} />
            <input type="password" className="input-field" placeholder="Repeat Password" required {...passwordRepeat} />
            <input type="checkbox" className="check-box" placeholder="User Id" />
            <span className="span-custom">I agree to the terms & conditions</span>
            <button type="submit" className="submit-btn" onClick={e => onSubmit(e,email,password,passwordRepeat)}>Register</button>
        </form>
    )
}

export default Register;
