import { DataUsage } from '@material-ui/icons';
import React, { useState, useEffect, Fragment } from 'react';

    import logoUmb from '../../icons/carpa.png';
    import sombrillaBlanca from '../../icons/paraguasBlanco.png'
    import sombrillaRoja from '../../icons/paraguasRojo.png'
    import Table from '@material-ui/core/Table';
    import Paper from '@material-ui/core/Paper';
    import { lighten, makeStyles } from '@material-ui/core/styles';
    import TableContainer from '@material-ui/core/TableContainer';

import DeployForm from './DeployForm';
import RowFormRent from '../Table/RowFormRent'
function Umbrella(props) {

    const { index, data, ...rest } = props;

    const [nroUmbrella, setNroUmbrella] = useState(data.tipo.substring(data.tipo.length - 3, data.tipo.length));

    const [renderDeploy, setrenderDeploy] = useState(false);
    const [onLeaveForm, setOnLeaveForm] = useState(false);

    const toggleRenderDeploy = (event) => {
        setrenderDeploy(!renderDeploy);
    }

    const toggleLeaveDeploy = (event) => {
        setOnLeaveForm(!onLeaveForm);
    }

    const checkClick = (event) => {
        if(event.target.classList.contains("container-deploy-form")){
            toggleRenderDeploy(event);
        }
    }

    const checkMouseOver = (event) => {

        var target = event.target.classList.contains("container-deploy-form");
        if(target || (!target && onLeaveForm))
            toggleLeaveDeploy(event);
    }

    const selectIcon = () => {
        if(data.rent[0]) return sombrillaRoja
        else return sombrillaBlanca
    }
 
    return (
        <div>
            <img src={selectIcon()} onDoubleClick={(event) => toggleRenderDeploy(event)} />
            <div className="nro-umbrella">
                <h5>{nroUmbrella}</h5>
            </div>
            {
                renderDeploy ?
                    <DeployForm 
                        renderDeploy={renderDeploy} 
                        onLeaveForm={onLeaveForm}
                        checkClick={checkClick} 
                        checkMouseOver={checkMouseOver}
                        data={data}
                        index={index} 
                        places = {props.places}
                        prices = {props.prices}
                        clients = {props.clients}

                    /> 
               : (<div />)
            }
        </div>
    )
}

export default Umbrella;
