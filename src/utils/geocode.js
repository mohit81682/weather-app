const request = require('postman-request');

const geocode =  (location, callback) => {
    if(location === undefined){
        return callback('Please enter location',undefined);
    }

    const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const url = baseUrl+location+".json?access_token=pk.eyJ1IjoibW9oaXQ4MTY4MiIsImEiOiJja2duZnB3MTkxYzhqMnVuYXdsaDExbXA2In0.oy2BVkcOtaot48z-UqSCyA&limit=1";

    request({url , json: true },(error, {body} = {}) => {
        if(error){
            callback("there is some error in request/connection",undefined);
        } else if(body.features.length === 0){
            callback('Please enter correct location',undefined);
        } else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0]['place_name'];
            callback(undefined, {latitude,longitude,location});
        }

    })
};

module.exports = geocode