const request = require('request')
const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGFuaWVsYnJvZyIsImEiOiJjanY0OGI0ZnIwMnh0NDRvMmZsaDFqdHEwIn0.1GTaYHBF871_MeoOtRcr5Q&limit=1'
	request({url, json: true}, (err, {body}) => {
		if (err){
			callback('Unable to connect to location services',undefined)
		}else if(!body.features[0]){
			callback('Unable to find location, try to search a new location.',undefined)
		}else{
			callback(undefined,{
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})

}

module.exports = geocode

