const request = require('request')
const forecast = (latitude,longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/'+process.env.WEATHER_API_KEY+'/' + latitude + ',' + longitude + '?units=si&'
	request({url, json: true}, (err, {body}) => {
		if(err){
			callback('Unable to connect to forecast services',undefined)
		}else if(body.error){
			callback('Unable to find location',undefined)
		}else{
			callback(undefined, {
				summary: body.hourly.summary,
				tempHigh: body.daily.data[0].temperatureMax,
				tempLow: body.daily.data[0].temperatureMin,
				temperature: body.currently.temperature,
				precipChance: body.currently.precipProbability
			})
		}
	})
}

module.exports = forecast

