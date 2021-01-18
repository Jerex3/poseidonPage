import React, { useState, Fragment } from 'react';

import logoFB from '../../icons/fb_original.png';
import logoTW from '../../icons/tw_original.png';
import logoGoo from '../../icons/ig_original.png';

import Register from './Register';
import Login from './Login';
import ButtonSlide from './ButtonSlide';
import ConfigAdvanced from './ConfigAdvanced';


import '../../styles/Login.scss';

function GlobalSession(props) {

    const [isLoginActive, setIsLoginActive] = useState(true);
    const [isConfigActive, setIsConfigActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const { onLogin, onRegister, ...rest } = props;

    const handleLoading = () => {
        setLoading(!loading);
    }

    const toogleConfig = (event) => {
        setIsConfigActive(!isConfigActive);
    }

    const toggleForm = (event) => {
        setIsLoginActive(!isLoginActive);
    }


    const getClassNameButton = () => {
        if(isLoginActive){
            return "custom-btn-slide left";
        }else{
            return "custom-btn-slide right";
        }
    }

    const getClassNameConfigAdvanced = () => {
        if(isConfigActive){
            return "btn-action-slide left";
        }else{
            return "btn-action-slide right";
        }
    }
    
    const checkConfigAdvanceClose = (event) => {
        if(!event.target.classList.contains("slide-form-checkbox") && !isConfigActive){
            toogleConfig();
        }
    }


    return (
        <div className="form-box">
            <ButtonSlide onClick={toggleForm} getClassName={getClassNameButton}/>
            <div className="social-icons">
                <img src={logoFB} />
                <img src={logoTW} />
                <img src={logoGoo} />
            </div>
            {
                isLoginActive ? (
                    <Login onSubmit={onLogin} isLoginActive={isLoginActive} handleLoading={handleLoading} />
                ) : (
                <>
                    <Register onSubmit={onRegister}  isLoginActive={isLoginActive} handleLoading={handleLoading} />
                    <div className={getClassNameConfigAdvanced()} onClick={toogleConfig}> 
                        <div className="text">Configuracion avanzada</div>
                    </div>
                    <ConfigAdvanced onClick={(event) => checkConfigAdvanceClose(event)} isConfigActive={isConfigActive} />
                </>
                )      
            }
            {loading && 
            <div className="loading" style={{ scale: "0.2", bottom: "-20%", left: "20%"}}>
                <span></span>
            </div>}
        </div>
    )
}   

export default GlobalSession;
