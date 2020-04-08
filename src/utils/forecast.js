const request = require("request")

const forecast = (lat, lon, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&APPID=f814ea762ab6cc77f755a950a56bcb0c&lang=tr&units=metric"

    request( {url, json: true},(error, {body}) =>{

        if(error) {
            callback("Unable to connect to server", undefined)
        }
        else if(body.message) {
            callback(body.message, undefined)
        } else {
            callback(undefined, body.list[0].weather)
        }
        
    } )
}

module.exports = forecast