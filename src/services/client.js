
const keyApi = 'https://poseidonrestapi.herokuapp.com/client';

const get = (page, limit, sortk, order) => {

    if(page && limit && sortk && order) 
        {
            console.log(keyApi+'?page='+page+'&limit='+limit+ '&sortk='+sortk+'&order='+order  )
            return fetch(keyApi+'?page='+page+'&limit='+limit+ '&sortk='+sortk+'&order='+order)
                             .then(res => res.json())
        }   
    else if (page && limit) return fetch(keyApi+'?page='+page+'&limit='+limit)
    .then(res => res.json())
    
    else return fetch(keyApi)
                .then(res => res.json())

    }

    const getById = (id) => fetch(`${keyApi}/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    })
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
    getById,
    post,
    del,
    update
}