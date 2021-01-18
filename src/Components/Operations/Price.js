
//Ver la manera de que se pueda hacer un fetch aca

function priceAccordingToDays(stayDays, umbrella, precios){ //No me convence

    var tarifaAnterior = 0;
    var tarifaCorrecta = 0;
    
    precios.map(place => {


        let nameUmb = umbrella.substring(0, umbrella.length - 4) //umbrella contains, the name and index format name_xxx numbers

        if(place.nombre === nameUmb){
            place.precio.map(tarifa => {
                if((stayDays <= tarifa.diaTope)){
                    tarifaAnterior = tarifa;
                }else{
                    tarifaCorrecta = tarifaAnterior;
                }
            })
        }
    })

    if(tarifaCorrecta === 0){
        tarifaCorrecta = tarifaAnterior;
    }

    return tarifaCorrecta.precio;
}

module.exports = {
    priceAccordingToDays
}