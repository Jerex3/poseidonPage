
const keyApi = 'https://poseidonrestapi.herokuapp.com/tarifa';

const get = () => fetch('https://poseidonrestapi.herokuapp.com/tarifa')
    .then(res => res.json())


const post =  (body) => fetch(keyApi, {       //Si tratamos a todas las tablas, tanto en update and delete, 
                   method: "POST",             //con un id podemos abstraer todo a un solo servicio
                   body,
                   headers:{
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                   }
                })
                .then(res => res.json())
               


const del = (id) => fetch(`${keyApi}/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                
const update = (id, body) => fetch(`${keyApi}/${id}`, {      //!Done en backend
                       method:"PUT",
                       body,
                       headers:{
                        'Content-Type': 'application/json'
                       }
                    })
                    .then(res => res.json())


export default {
    get,
    post,
    del,
    update
}