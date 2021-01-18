import React  from 'react'
import TableDetail from '../Table/TableDetail';
import fetchIngreso from '../../services/ingreso'


export default function Ingresos(props) {

    const { data, parcialesData, handleEmailContent, ...rest } = props;


    function deleteIngreso(id){
        props.toastWarn("Ingreso eliminado");
        return fetchIngreso.del(id);
    }

    function updateIngreso(id,body){
        props.toastSuccess('Ingreso modificado');
        return fetchIngreso.update(id,body);
    }

    function addIngreso(body){
        props.toastSuccess("Ingreso añadido");
        return fetchIngreso.post(body);
    }
    const getPage = (page, limit) => {
        return fetchIngreso.get(page,limit);
    }

    return (

            <div style={{ marginTop: "10%" }} >
                <TableDetail
                    handleEmailContent={handleEmailContent}
                    data={data}
                    parcialesData={parcialesData}
                    handleData = {props.handleData}
                    handleParcialData={props.handleParcialData}
                    title={"Ingresos"}
                    post={addIngreso}
                    toastSuccess={props.toastSuccess}
                    delete={deleteIngreso}
                    update ={updateIngreso}
                    limit = {5}
                    getPage = {getPage}
                />
            </div>
    )
}
