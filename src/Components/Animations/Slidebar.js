import React from 'react'
import css from '../../styles/slidebar.scss'
import {Link} from 'react-router-dom'

//images-----------------------------
import logo from '../../icons/icono.svg'
import menu from '../../icons/menu.svg'
import clientImg from '../../icons/client.png'
import ingresoImg from '../../icons/ingreso.png'
import parkingImg from '../../icons/parking.png'
import rentImg from '../../icons/llave.png'
import sombrillaImg from '../../icons/sombrilla.png'
//---------------------------------




export default function Slidebar(props)  {
    

    const [open, setOpen] = React.useState(false)
    const [left,setLeft] = React.useState("-200px")
    const [transparency, setTransparency] = React.useState(false)

   

   const SlideB = () =>{
        if(open){
            setOpen(!open)
            setLeft('-200px')
          
        }
        else{
            setOpen(!open)
            setLeft('0px')
        }
    }

    const getClassNameForm = () => {
        var auxName = "";
        if(open){
            if(transparency){
                auxName= "container-deploy-form open transparency"
            }else{
                auxName= "container-deploy-form open"
            }  
        }else{
            auxName= "container-deploy-form"
        }
        return auxName;
    }

    const checkMouseOver = (event) => {
        var target = event.target.classList.contains("container-deploy-form");
        if(target){
            setTransparency(true)
        }
    }

    const checkMouseLeave = (event) => {
        var target = event.target.classList.contains("container-deploy-form");
        if(target){
            setTransparency(false)
        }
    }

    const checkClick = (event) =>{
        if(event.target.classList.contains("container-deploy-form")){
                SlideB();
        }
    }
      
    const pressTab = (event) => {

        if(event.key == 'Tab') {
            SlideB()
        }


    }


    React.useEffect(() => {
        document.addEventListener("keydown", pressTab)
    }, [])


        return (
        <>
        
        <div className={getClassNameForm()} onMouseLeave={ event => checkMouseLeave(event)} onMouseOver={ event => checkMouseOver(event)} onClick={ event => checkClick(event)} />
            <div id = "slideBar" style ={{left:left}}> 
                <img className = "logoT" src = {logo} />
                <div className="btn-menu" onClick= {SlideB}>
                    <img src = {menu} />
                </div>
                <ul>
                    <Link onClick ={SlideB} className="Link" to = '/'>
                        <img className = "slideImg" src = {sombrillaImg} />
                        <li>Balneario</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/parking'>
                        <img className = "slideImg" src = {parkingImg} />
                        <li>Estacionamiento</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/clients'>
                        <img className = "slideImg" src = {clientImg} />
                        <li>Clientes</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/rents'>
                        <img className = "slideImg" src = {rentImg} />
                        <li>Alquileres</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/ingresos'>
                        <img className = "slideImg" src = {ingresoImg} />
                        <li>Ingresos</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/egresos'>
                        <li>Egresos</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/estadisticas'>
                        <li>Estadisticas</li>
                    </Link>
                    <Link onClick ={SlideB} to = '/logout'>
                        <li>Cerrar Sesion</li>
                    </Link>
                </ul>
            </div>
        </> 
        )
    
}

