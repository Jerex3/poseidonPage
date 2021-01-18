import React, { useState } from 'react'
import TableDetail from '../Table/TableDetail';
import fetchEgreso from '../../services/egreso'

export default function Egresos(props) {

    const { data, parcialesData, handleEmailContent, ...rest } = props;

    function deleteEgreso(id) {
        props.toastWarn("Egreso eliminado");
        return fetchEgreso.del(id);
    }

    function updateEgreso(id, body) {
        props.toastSuccess('Egreso modificado');
        return fetchEgreso.update(id, body);
    }

    function addEgreso(body) {
        props.toastSuccess("Egreso añadido");
        return fetchEgreso.post(body);
    }


    return (

        <div style={{ marginTop: "10%" }} >
            <TableDetail
                data={data}
                parcialesData={parcialesData}
                handleEmailContent={handleEmailContent}
                title={"Egresos"}
                post={addEgreso}
                toastSuccess={props.toastSuccess}
                delete={deleteEgreso}
                update={updateEgreso}
            />
        </div>
    )
}