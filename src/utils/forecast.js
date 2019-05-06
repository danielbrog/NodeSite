const request = require('request')
const forecast = (latitude,longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/f9bcb9e1bb17547524e8c25af03f1d4f/' + latitude + ',' + longitude + '?units=si&'
	request({url, json: true}, (err, {body}) => {
		if(err){
			callback('Unable to connect to forecast services',undefined)
		}else if(body.error){
			callback('Unable to find location',undefined)
		}else{
			callback(undefined, {
				temperature: body.currently.temperature,
				precipChance: body.currently.precipProbability
			})
		}
	})
}

module.exports = forecast

