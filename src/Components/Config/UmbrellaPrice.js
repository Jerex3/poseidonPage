import React, { useState, useEffect, Fragment } from 'react'

import '../../styles/Prices.scss'

import fetchPrice from '../../services/price'
import fetchTarifa from '../../services/tarifa'

import { useInputValue } from '../hooks/useInputValue'

import { Redirect } from 'react-router-dom';

import Context from '../../Context'

export const UmbrellaPrice = () => {


    const [render, setRender] = useState(true);

    const [umbrellas, setUmbrellas] = useState('');
    const [currentUmbrella, setCurrentUmbrella] = useState({ precio: [] });
    const [currentTarifa, setCurrentTarifa] = useState({ precio: '' });

    const [buttonAdd, setButtonAdd] = useState(false);

    const select = useInputValue('');

    const nombre = useInputValue('');

    const mes = useInputValue('');

    const [precio, setPrecio] = useState()

    const handleData = (data) => {
        setUmbrellas(data);
        setCurrentUmbrella(data[0])
    }

    const handleUmbrella = (index) => {
        console.log('entre a handleUmbrella')
        console.log(nombre)

        //setCurrentUmbrella(umbrellas[index]);
    }

    const handleMonth = (index) => {
        console.log(index)
        setCurrentTarifa(currentUmbrella.precio[index])
        setPrecio(currentUmbrella.precio[index].precio) // no se puede usar currentTarifa porque llega desactualizado
    }


    const modifyPrice = () => {

        let id = currentUmbrella._id;
        let body = {
            nombre: nombre.value
        }

        console.log(nombre)
        fetchPrice.update(id, JSON.stringify(body))  //este update esta al pedo
            .then(res => {
                console.log("Sombrilla modificada: " + res);

                let id = currentTarifa._id;
                let body = {
                    diaTope: mes.value, // o poner el del current asi no se puede modificar el mes
                    precio: precio
                }
                fetchTarifa.update(id, JSON.stringify(body))
                    .then(res => {
                        console.log("La tarifa ha sido modificada: " + res)
                    })
                    .catch(err => console.log("No se pudo modificar la tarifa: " + err))

            })
            .catch(err => console.log("No se pudo modificar la sombrilla: " + err))
    }


    const addPrice = () => {

        let body = {
            diaTope: mes.value,
            precio: precio,
        }
        console.log(body)
        console.log(currentUmbrella._id)
        fetchTarifa.post(JSON.stringify(body))
            .then(res => {

                let idTarifa = res._id;
                let body = {
                    nombre: nombre.value,
                    precio: [idTarifa]
                }
                fetchPrice.update(currentUmbrella._id, JSON.stringify(body))
                    .then(res => {
                        console.log("Tarifa agregada")
                    })
                    .catch(err => console.log("No se pudo agregar la : " + err))

            })

    }

    const toggleButton = () => {
        setButtonAdd(!buttonAdd)
    }

    const handleRender = () => {
        setRender(false);
    }

    useEffect(() => {

        fetchPrice.get()
            .then(res => {
                handleData(res);

                console.log(res)
            })

    }, [])


    return (

        <Context.Consumer>
            {
                ({ toggleSettings }) => {

                    {
                        if (!render) {
                            toggleSettings();
                            return <Redirect to="/logout" />
                        }
                    }

                    return umbrellas ? (
                        <Fragment>
                            <div className="container-form-prices">
                                <div className='SL-div'>
                                    <label className="label-select" >Seleccionar sombrilla</label>

                                    <select name="umbrellas" onChange={(event) => { nombre.onChange(event); handleUmbrella(event.target.value) }} title="Elegir Lugar" defaultValue="Elegir Lugar">
                                        {umbrellas.map((umbrella, index) => {
                                            return <option key={index} value={umbrella.nombre}>{umbrella.nombre}</option>
                                        })}
                                    </select>
                                </div>

                                <div className='SL-div'>
                                    <label className="label-select" >Agregar precio por dia?</label>
                                    <input type="checkbox" onChange={toggleButton} />
                                </div>

                                <div className='SL-div'>
                                    {buttonAdd ? (
                                        <a>
                                            <label className="label-select" >Meses</label>
                                            <input {...mes} />
                                        </a>
                                    ) : (
                                            <a>
                                                <label className="label-select" >Seleccionar mes</label>
                                                <select name="month" onChange={event => { mes.onChange(event); handleMonth(event.target.value) }} title="Elegir Mes" defaultValue="Elegir Mes">
                                                    {currentUmbrella.precio.map((precio, index) => {
                                                        return <option key={index} value={index}> {precio.diaTope}</option>

                                                    })}
                                                </select>
                                            </a>
                                        )}


                                </div>
                           

                                <div className='SL-div'>
                                    <label className="label-select" >Precio</label>
                                    <input type="text" onChange={(event) => setPrecio(event.target.value)} {...precio} />
                                </div>

                                {buttonAdd
                                    ? <button onClick={addPrice}>Añadir Precio</button>
                                    : <button onClick={modifyPrice}>Modificar Precio</button>
                                }

                                <button onClick={handleRender}>Atrás</button>
                            </div>

                        </Fragment>
                    ) : (
                            <h2>Espera a que cargue pa, no seas impaciente ndeah</h2>
                        )
                }
            }
        </Context.Consumer>
    )
}
