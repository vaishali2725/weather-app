const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=2&access_token=pk.eyJ1IjoidmFpc2hhbGkyNTEwIiwiYSI6ImNsNmFjMm91NjAwNzgzaXJrb3g2dHl3a2cifQ.0xq7QIwE8rKgBRruVD101A&limit=1';
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location services:', undefined);
        }else if(body.features.length === 0){
            callback('unable to find location. Please try another search:', undefined);
        }else{
            const resp = body;
            const data = {
                longitude:resp.features[0].center[0],
                latitude:resp.features[0].center[1],
                location:resp.features[0].place_name
            }

            callback(undefined, data);
        }
    })

}

module.exports = geocode;