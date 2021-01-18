const keyApi = 'https://poseidonrestapi.herokuapp.com/ingresoparcial';

const get = () => fetch('https://poseidonrestapi.herokuapp.com/ingresoparcial')
    .then(res => res.json())

const post =  (body) => fetch(keyApi, {
                   method: "POST",
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
                
const update = (id, body) => fetch(`${keyApi}/${id}`, {
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