
const helper = require('./helpers.js');

var requestPromise = require('request-promise').defaults({
    proxy:'http://69.63.170.74:3128'
})
// all possible combination of string in 3 
const a_z = 'abcdefghijklmnopqrstuvwxyz'
const arr_a_z = [...a_z]
const arr_allPossibleCombination = helper.allPossibleCombinations(arr_a_z,3,'')
const arrCombination = arr_allPossibleCombination.splice(0,100);
console.log(arrCombination);

( () => {
    let count = 0;
    for(ele of arrCombination){
        let data_url = `https://app.localiza.com/Reserva/Agencias/Autocomplete?nomeParcialAgencia=${ele}&nomePais=argentina&codigoCultura=es-ar&parceiro=false&devolucao=false&_=1608403427210`
        // console.log(data_url)
        let options = {
            uri: data_url,
            headers: {
                'authority': 'app.localiza.com',
                'method': 'GET',
                'scheme': 'https',
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,ne;q=0.8',
                'origin': 'https://www.localiza.com',
                'referer': 'https://www.localiza.com/',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
            },
            json: true , // Automatically parses the JSON string in the response
            gzip:true
        };
        requestPromise(options)
        .then(async results => {
            // console.log(results, results.length);
            for(result of results){
                if(result.Agencias.length == 1) {
                    try {
                        const DetailsInfo = helper.countryWithOneAirport(result, ele)
                        await helper.objectToCsv(DetailsInfo)
                    } 
                    catch (err) {
                        console.log('err in single airport',err);
                    }
                }
                if(result.Agencias.length > 1) {
                    try {
                        const DetailsInfo = helper.countryWithMoreThanOneAirport(result, ele)
                        await helper.objectToCsv(DetailsInfo)
                    }
                    catch(err){
                        console.log('err in multiple airport', err);
                    }
                }
            }
        })
        .catch(err => {
            console.log(`error in ${ele} this element`);
        })
    }
})();


