function transformDate(date){

    

    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear()
    
    const dateFormat = day + ' / ' + month + ' / ' + year;
    
    return dateFormat;
}

const stringToDate = (date) => {
    
    if(date.length == 14)
    {
        return new Date(date.slice(10),date.slice(5,7) - 1 ,date.slice(0,2))
    }
    else if (date.length == 13)
    {
        return new Date(date.slice(9),date.slice(4,7) - 1 ,date.slice(0,2))

    }

    return new Date();

} 
    
function getCantDays(dateF, dateI){

    const miliSeconds = dateF - dateI;

    var day_as_milliseconds = 86400000;

    const days = miliSeconds / day_as_milliseconds;

    return days ;
}

const dateOverlap = (originDate, endDate, lugar, rents) => {

    originDate = new Date(originDate)
    endDate = new Date(endDate)

    let overlap = false
    console.log(originDate + " " + endDate)
    console.log(rents)
        console.log(' loop: ')
    rents.forEach(rent => {

        

            let originAux = stringToDate(rent.fecha_inicial)
            let endAux = stringToDate(rent.fecha_final)
            console.log('Origin Aux: '+originAux)
            console.log('-------------')
            console.log('End Aux '+endAux)

            console.log('----------------------------')

            if (endDate.getTime() >= originAux.getTime()) {
                if (endDate.getTime() >= endAux.getTime()) {
                    if (originDate.getTime() <= endAux.getTime()) {
                        console.log('entro?')
                        overlap = true; 
                        return true;
                    }
                }
                else {

                    overlap = true;
                    return true;
                }

            }
        

    });

    console.log(overlap)


    return overlap;
}

module.exports = {
    transformDate:transformDate,
    getCantDays:getCantDays,
    stringToDate:stringToDate,
    dateOverlap:dateOverlap
}

