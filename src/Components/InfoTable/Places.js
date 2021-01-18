import React, { useState, useEffect } from 'react';
import TableStyled from '../Table/Table';
import http from '../../services/place';
import TextField from '@material-ui/core/TextField';



export default function Places(props) {

    const { picker, infoTablePick, ...rest } = props;
    
    const [data, setData] = useState([{
        ['descripcion']: 'vacio',
        ['tipo']: 'vacio',
        ['image_path']: 'vacio'
    }]);
    const [load, setLoad] = useState(true);

    function deletePlace(id){
        props.toastWarn("Lugar eliminado");
        return http.del(id);
    }

    function updatePlace(id,body){
        props.toastSuccess('Lugar modificado');
        return http.update(id,body);
    }

    function addPlace(body)
    {
        props.toastSuccess("Lugar añadido");
        return http.post(body);
    }

    const handleData = (dataR) => {
        setData(dataR.filter(elem => {
            delete elem.recordatorio;
            delete elem.image_path;
            delete elem.rents;
            return elem;
        }))
    }

    useEffect(() => {
        http.get()
            .then(dataR => {
                if(dataR.length){
                    handleData(dataR)
                }
                setLoad(false);
            })
    }, [])

    const filter = (event) => {
       !event.target.value.length ? setBrowsering(false) : setBrowsering(true)
       const newData = data.filter(doc => {
            if(doc.name.includes(event.target.value) || doc.secondName.includes(event.target.value) || doc.dni.includes(event.target.value) || doc.email.includes(event.target.value))
            {
                return doc
            }
            else {

            }
        } )
        setfilterData(newData);
    }

    return (
        load ? (
            <div className="loading" style={{ float: "left" }}>
                <span>cargando...</span>
            </div>
        )
            :
            <div style={{ marginTop: "10%" }} >

            <TextField id="standard-secondary" label="Buscar" variant ="filled" color = "secondary" onChange={filter}/>
                <TableStyled
                    handleEmailContent={props.handleEmailContent}
                    data={data}
                    title={"Espacio"}
                    post={addPlace}
                    toastSuccess={props.toastSuccess}
                    delete={deletePlace}
                    update ={updatePlace}
                    picker = {picker}
                    infoTablePick = {infoTablePick}
                />
            </div>
    )
}