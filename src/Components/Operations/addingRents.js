import fetchRent from '../../services/rent'
import fetchIngreso from '../../services/ingreso'
import fetchIngresoParcial from '../../services/ingresoParcial';

require('babel-polyfill')

export const addRent = async (estacionamiento, pago, newRent, newIngreso, newIngresoParcial) => {

    let ingresoPar;

    if(pago) ingresoPar = await fetchIngresoParcial.post(JSON.stringify(newIngresoParcial))


    fetchRent.post(JSON.stringify(newRent)) // INSERTO EL RENT.
                .then((resAlquiler) => {
                    
                    var ingreso = newIngreso;

                    // Si hay ingresoParcial lo seteo, sino no.
                    if(pago) ingreso.parciales = [ingresoPar._id]; else ingreso.parciales = []

                    ingreso.alquiler = resAlquiler._id
    
                    fetchIngreso.post(JSON.stringify(ingreso)) // OBTENGO EL ID ALUILER E INSERTO EL INGRESO
                        .then((resIngreso) => { // AL RENT QUE AGREGUE LE ACTUALIZO EL ID DEL PAGO Y EL LUGAR.

                            fetchRent.update(ingreso.alquiler, JSON.stringify({"lugar":resAlquiler.lugar,"pago": resIngreso._id}))
                            if(estacionamiento) {} // Si llega estacionamiento deberia fetchear a estacionamiento. tengo idAlquiler, idPago. 

                        })
                        .catch(err => console.log("No se pudo cargar el Ingreso" + err))
                })
                .catch((err) => console.log(err))
}

