

import DotChart from '../Graficos/dotChart'
import BarChart from '../Graficos/barChart'
import MaxUmbrella from '../Graficos/MaxUmbrella'

import React, { useState, useEffect } from 'react'

import fetchStats from '../../services/stats'


Chart.defaults.global.defaultFontColor = "#c4c4c4"; // Setea globalmente el color del texto de los graficos


export default function estadisticas(props){


    const { rentData, clientData, ingresoData, egresoData, ...rest } = props;  


    // Un state por cada data necesaria para los graficos.

    const [dataIngresos, setDataIngresos] = useState([])
    const [daysPlace, setDaysPlace] = useState([])
    const [daysClient, setDaysClient] = useState([])

    const [loadIngresos, setLoadIngresos] = useState(false)
    const [loadDaysP, setLoadDaysP] = useState(false)
    const [loadDaysC, setLoadDaysC] = useState(false)

    
    useEffect(() => {

        fetchStats.getDaysPerClient().then(dataC => { setDaysClient(dataC); setLoadDaysC(true)})
        fetchStats.getDaysPerPlace().then(dataP => { setDaysPlace(dataP); setLoadDaysP(true)})
        fetchStats.ingresosPerMonth().then(dataI => { setDataIngresos(dataI); setLoadIngresos(true)})

    })

    return (
        !(loadIngresos && loadDaysC && loadDaysP) ?
        (<div>cargando</div>) :
    <div style={{marginTop:"10%"}}>

       <div style={{ marginRight: "30px", float:'left' }}>     
        <DotChart data = {dataIngresos} nombre = {'Ingresos'}/>
       </div>

       <div>
           <BarChart data = {daysClient}/>
       </div>

       <div>
           <MaxUmbrella data ={daysPlace} title={'Sombrillas Más Usadas'}/>
       </div>

   </div>

    )

} 