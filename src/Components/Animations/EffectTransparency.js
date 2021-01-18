import React, { useState } from 'react'

export default function EffectTransparency(props) {

    const {  nameTable, toggleRenderComponent, children, ...rest } = props;

    const [onLeaveForm, setOnLeaveForm] = useState(false)

    const getClassNameDeployForm = () => {

        var clase="";

        
            if(onLeaveForm)
                clase = "container-deploy-form open transparency";
            else
                clase = "container-deploy-form open";
        
        return clase;
    }

    const checkClick = (event) => {
        if(event.target.classList.contains("container-deploy-form")){
            toggleRenderComponent(nameTable,true);
        }
     }
 
     const checkMouseOver = (event) => {
         var target = event.target.classList.contains("container-deploy-form");
         if(target || (!target && onLeaveForm)){
             toggleLeaveDeploy(event);
         }
     }

     const toggleLeaveDeploy = (event) => {
        setOnLeaveForm(!onLeaveForm);
     }

    return (
        <div 
            className={getClassNameDeployForm()}
            onClick={(event) => checkClick(event)} 
            onMouseOver={(event) => checkMouseOver(event)}
        >
            <div className="content-table">
                {children}
            </div>
        </div>  
    )
}