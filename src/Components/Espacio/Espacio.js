import React, { Fragment, useState, useEffect } from 'react';

import '../../styles/Espacio.scss';

import Umbrella from './Umbrella';

export const Espacio = (props) => {

    const { places, ...rest } = props;

    
    const keyPress = "m"; //Se podria cargar desde backend, es decir, modificable para cada usuario.
    const [moveBackground, setMoveBackground] = useState(false);


    const anyKey = (event) => {

        if( event.key == keyPress){
            setMoveBackground(!moveBackground)
        }
    }

    useEffect(() => {


        document.addEventListener("keypress", anyKey);

        var containerUmb = document.getElementById("container-umb")


        function onMouseMove(event) {

            var mouseX = event.pageX;
            var mouseY = event.pageY;

            var transitionX = mouseX / (window.innerWidth / 15)
            var transitionY = mouseY / (window.innerHeight / 15)

            containerUmb.style.transform = "translate(-" + transitionX.toString() + "%,-" + transitionY.toString() + "%)";

        }

        

        if ( moveBackground ){

            window.addEventListener("mousemove", onMouseMove)

        }
        

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("keypress", anyKey)
        }

    }, [moveBackground])

    return (
        <div className="container-umb" id="container-umb">  
            <div className="beach-icons">
                {places.map((sombrilla, index) => {
                    return (
                        <Fragment>
                            <Umbrella index={index} data={sombrilla} key={index} clients = {props.clients} prices = {props.prices} places = {props.places} />
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

