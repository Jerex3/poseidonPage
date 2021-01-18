const keyApi = 'https://poseidonrestapi.herokuapp.com/filter';

const filterClient = (filter) => {
    
    return fetch(`${keyApi}/${'client'}`, {
        method: "POST",
        body:filter,
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }
    })
    .then(res => res.json())

}

const filterRent = (filter) => {
    
    return fetch(`${keyApi}/${'rent'}`, {
        body:filter,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }})
        .then(res => res.json())

}

const filterPlace = (filter) => {
    
    return fetch(`${keyApi}/${'place'}`, {
        body:filter,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }})
        .then(res => res.json())

}

const filterIngreso = (filter) => {
    
    return fetch(`${keyApi}/${'ingreso'}`, {
        body:filter,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }})
        .then(res => res.json())

}

const filterEgreso = (filter) => {
    
    return fetch(`${keyApi}/${'egreso'}`, {
        body:filter,
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        }})
        .then(res => res.json())

}

export default {
    filterClient,
    filterRent,
    filterPlace,
    filterIngreso,
    filterEgreso
}