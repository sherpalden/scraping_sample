
const ObjectsToCsv = require('objects-to-csv');
 

const allPossibleCombinations = (input, length, curstr) => {
    if(curstr.length == length) return [ curstr ];
    var ret = [];
    for(var i = 0; i < input.length; i++) {
        ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
    }
    return ret;
}

const objectToCsv = (data) => {
    return new Promise((resolve, reject) => {
        const csv = new ObjectsToCsv(data);
        csv.toDisk('./test2.csv', {append: true}, err => {
            if(err) reject(err)
            else resolve();
        })
    })
}


const countryWithOneAirport = (obj, input) => {
    return [
        {
            'input': input,
            'country_name':obj.NomePais,
            'city' : obj.Agencias[0].NomeCidade,
            'airport_name' : obj.Agencias[0].Nome
        }
    ]
}

const countryWithMoreThanOneAirport = (obj, input) => {
    const arrObj = [];
    for (airport of obj.Agencias){
        arrObj.push({
            'input': input,
            'country_name': obj.NomePais,
            'city' : airport.NomeCidade,
            'airport_name' : airport.Nome
        })
    }
    return arrObj;
}




// console.log();

module.exports ={
    allPossibleCombinations,
    objectToCsv,
    countryWithOneAirport,
    countryWithMoreThanOneAirport
}