const keyApi = 'https://poseidonrestapi.herokuapp.com/stats';


const getDaysPerClient = () => fetch(keyApi + '/daysClient').then(res => res.json())

const getDaysPerPlace = () => fetch(keyApi + '/daysPlace').then(res => res.json())

const ingresosPerMonth = () => fetch(keyApi + '/ingresosm').then(res => res.json())

const egresosPerMonth = () => fetch(keyApi + '/egresosm').then(res => res.json())



export default {
    getDaysPerClient,
    getDaysPerPlace,
    ingresosPerMonth,
    egresosPerMonth
}