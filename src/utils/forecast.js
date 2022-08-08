// const request = require('request');

// const forecast = (lat, long, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=16c7e2a816c0aa0570e684c2e15579ac&query='+ lat + ','+ long;
//     request({url:url, json:true}, (error, response) => {
//         if(error){
//             callback('Unable to connect to weather service', undefined);
//         }else if(response.body.error){
//             callback('Unable to find location', undefined);
//         }else{
//             const data = response.body;
//             const msg = 'It is currently ' + data.current.temperature + ' degrees out but it feels like '+ data.current.feelslike;
//             callback(undefined, {msg:msg});
//         }
//     })
// }

// module.exports = forecast;

const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=16c7e2a816c0aa0570e684c2e15579ac&query='+ lat + ','+ long;
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            const data = body;
            const msg = 'It is currently ' + data.current.temperature + ' degrees out but it feels like '+ data.current.feelslike;
            callback(undefined, {msg:msg});
        }
    })
}

module.exports = forecast;