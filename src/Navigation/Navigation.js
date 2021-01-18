import React, { Fragment, useState, useEffect } from 'react'


import Estadisticas from '../Components/InfoTable/Estadisticas'

//Tablas
import Clients from '../Components/InfoTable/Clients'
import Rents from '../Components/InfoTable/Rents'
import { Espacio } from '../Components/Espacio/Espacio';
import Ingresos from '../Components/InfoTable/Ingresos'
import Egresos from '../Components/InfoTable/Egresos'

//Formularios
import { FormUser } from '../Components/Login/FormUser';
import { Logout } from '../Components/Logout/Logout'
import { EmailForm } from '../Components/Email/EmailForm'

import Slidebar from '../Components/Animations/Slidebar'

//External
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UmbrellaPrice } from '../Components/Config/UmbrellaPrice';

import Context from '../Context'

//Services

import clientFetch from '../services/client'
import egresoFetch from '../services/egreso'

import ingresoFetch from '../services/ingreso'

import placeFetch from '../services/place'
import rentFetch from '../services/rent'
import priceFetch from '../services/price'


export default function Navigation() {

    const [emailContent, setEmailContent] = useState('')

    const [clientData, setClientData] = useState({});
    
    const [egresoData, setEgresoData] = useState([{
        ['descripcion']: 'vacio',
        ['total']: 'vacio',
        ['deuda']: 'vacio',
        ['fecha_creacion']: 'vacio'
    }]);

    const [egresoParcialData, setEgresoParcialData] = useState([{
        parciales: []
    }]);

    const [ingresoData, setIngresoData] = useState([{
        ['descripcion']: 'vacio',
        ['total']: 'vacio',
        ['deuda']: 'vacio',
        ['fecha_creacion']: 'vacio'
    }]);

    const [ingresoParcialData, setIngresoParcialData] = useState([{
        parciales: []
    }]);

    const [placeData, setPlaceData] = useState({});
    const [placeDataMain, setPlaceDataMain] = useState({})

    const [rentData, setRentData] = useState([{
        ['fecha_inicial']: 'vacio',
        ['fecha_final']: 'vacio',
        ['cliente']: 'vacio',
        ['lugar']: 'vacio'
    }]);

    const [priceData, setPriceData] = useState({});


    const [loadIngresoP, setLoadIngresoP] = useState(true);
    const [loadIngreso, setLoadIngreso] = useState(true);

    const [loadEgresoP, setLoadEgresoP] = useState(true);
    const [loadEgreso, setLoadEgreso] = useState(true);

    const [loadRent, setLoadRent] = useState(true);
    const [loadClient, setLoadClient] = useState(true);
    const [loadPlace, setLoadPlace] = useState(true);
    const [loadPrice, setLoadPrice] = useState(true);
    const [loadPlaceMain, setLoadPlaceMain] = useState(true)



    function EmailFormConf() {
        return <EmailForm body={emailContent} />
    }

    function EspacioConf() {
        return (
            <div className="total">
                <Espacio places={placeDataMain} prices = {priceData} clients = {clientData}/>
            </div>
        )
    }

    const ClientConf = () => {
        
        return (
            <div className="total">
                <Clients
                    toastSuccess={toastSuccess}
                    toastWarn={toastWarn}
                    handleEmailContent={handleEmailContent}
                    picker={false}
                    data = {clientData}
                    handleData = {setClientData}
                />
            </div>
        )
    }


    function RentConf() {
        return (
            <div className="total">
                <Rents
                    toastSuccess={toastSuccess}
                    handleEmailContent={handleEmailContent}
                    toastWarn={toastWarn}
                    picker={false}
                    data = {rentData}
                    handleData = {setRentData}
                    handleIngresoData = {setIngresoData}
                    clients = {clientData}
                    places = {placeData}
                    prices = {priceData}
                />
            </div>
        )
    }

    const handleParcialData = (index, newRowParcial) => {

    }

    

    function IngresoConf() {
        return (
            <div className="total">
                <Ingresos
                    toastSuccess={toastSuccess}
                    toastWarn={toastWarn}
                    handleEmailContent={handleEmailContent}
                    handleData={setIngresoData}
                    handleParcialData = {handleParcialData}
                    data = {ingresoData}
                    parcialesData = {ingresoParcialData}
                />
            </div>
        )

    }

    function EgresoConf() {
        return (
            <div className="total">
                <Egresos
                    toastSuccess={toastSuccess}
                    toastWarn={toastWarn}
                    handleEmailContent={handleEmailContent}
                    data={egresoData}
                    parcialesData={egresoParcialData}
                />
            </div>
        )
    }
    function EstadisticasConf() {
        return (
            <div className="total">
                <Estadisticas
                clientData = {clientData}
                rentData = {rentData}
                ingresoData = {ingresoParcialData}
                egresoData = {egresoParcialData}
                priceData= {priceData}
                />
            </div>
        )
    }

    const handleEmailContent = (body) => {
        setEmailContent(body);
    }

    const toastSuccess = (message) => {  //Esto llevarlo a un consumer/provider
        toast.success(message, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
        })
    }

    const toastWarn = (message) => {
        toast.warn(message, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT
        })
    }

    const comparePlaces = (a, b) => { //Extrae los 3 digitos xxx del tipo lugar para compararlos
        const first = a.tipo.substring(a.tipo.length - 3, a.tipo.length)
        const second = b.tipo.substring(b.tipo.length - 3, b.tipo.length)
        return first - second;
    }
  
    useEffect(() => {


        clientFetch.get(1,5).then(data => { setClientData(data); setLoadClient(false) })

        egresoFetch.get(1,5)
        .then(data => {
            if (data[0].length){
                setEgresoData(data[0]);
                setEgresoParcialData(data[1]);   
            }
            setLoadEgresoP(false); 
            setLoadEgreso(false)
        })

        ingresoFetch.get(1,5)
        .then(data => {
            if(data[0].length){
                setIngresoData(data[0]); 
                setIngresoParcialData(data[1]); 
            }
            setLoadIngresoP(false); 
            setLoadIngreso(false) 
        })

        placeFetch.get()
        .then(data => { 
            
            data.sort( (a,b) => comparePlaces(a,b) ) //ordena las sombrillas ascendentemente
            
            setPlaceData(data); 
            setLoadPlace(false) 
        })

        placeFetch.getViewMain()
        .then(data => {
            setPlaceDataMain(data);
            setLoadPlaceMain(false)
        })

        rentFetch.get(1,5).then(data => {
            if(data.length){
                setRentData(data); 
            }
            setLoadRent(false)
        })

        priceFetch.get().then(data => { setPriceData(data); setLoadPrice(false) })


        
    }, [])
    
    return ((loadPlace || loadRent || loadIngreso || loadIngresoP || loadEgreso || loadEgresoP ||loadPrice || loadClient || loadPlaceMain) ? (
        <div className="total" >
        <div className="loading" >
            <span>cargando...</span>
        </div>
        </div>
    )
        :
        <Router onUpdate={() => window.scrollTo(0, 0)}>
            <Slidebar />
            <ToastContainer />
            <Context.Consumer>{          //Todo esto puede ir a parar a un archivo Routes
                ({ isAuth, logOut, isSendEmail, isSettings }) =>
                    isAuth ? (
                        <Fragment>
                            {/* <Redirect to="/" /> */}
                            <Switch>
                                {isSendEmail && <Route path="/sendemail" component={EmailFormConf} />}
                                <Route exact path="/" component={EspacioConf} />
                                <Route path="/clients" component={ClientConf} />
                                <Route path="/rents" component={RentConf} />
                                <Route path="/ingresos" component={IngresoConf} />
                                <Route path="/egresos" component={EgresoConf} />
                                <Route path='/estadisticas' component={EstadisticasConf} />
                                
                                {/* <Route path="/price" component={PriceConf} /> Esta ruta va para la mod de precio de sombrillas*/}
                                {isSettings && <Route path="/prices" component={UmbrellaPrice} />}
                                <Route exact path="/logout" >
                                    <Logout onClick={logOut} /> {/*  //Este va asi por el methodo logOut :( */}
                                </Route>
                                {isSendEmail && <Route path="/sendemail" component={EmailFormConf} />}
                                {isSettings && <Route path="/prices" component={UmbrellaPrice} />}
                            </Switch>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Redirect to="/login" />
                                <Route path="/login" component={FormUser} />
                            </Fragment>
                        )
            }</Context.Consumer>

        </Router>
    )
}



