const request = require('postman-request');

const forcast = ({latitude,longitude,location}, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=195a7643ac4ef3050141acb02b4b72ff&query="+latitude+","+longitude;

    request( {url, json: true}, (error,response) => {
        if(error){
            callback("Unable to connect to weather service",undefined);
        } else if(response.body.error){
            callback(response.body.error.info,undefined);
        } else{
            const data = response.body;
            if(data.current !== undefined){
                const temperature = data.current.temperature;
                const rain = data.current.feelslike;
                callback(undefined, {temperature:temperature, rain:rain})
            } else {
                callback(data,undefined);
            }
        }

    });
};

module.exports = forcast;