import React from 'react'

function ButtonSlide(props) {

    const { containerRef, ...rest } = props;


    return (
        <div className="button-box">
            <div className={props.getClassName()} ref={containerRef} ></div>
            <button type="button" className="toggle-btn" onClick={(event) => props.onClick(event)} >Log In</button>
            <button type="button" className="toggle-btn" onClick={(event) => props.onClick(event)} >Register</button>   
        </div>
    )
}

export default ButtonSlide;

