const path = require('path')
const express = require('express')
const router = new express.Router()

//importing internal weather modules
const geocode = require(path.join(__dirname, '../utils/geocode'))
const forecast = require(path.join(__dirname, '../utils/forecast'))


router.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.render(path.join(__dirname, '../../templates/views/weather'), {
			title: 'Weather',
			name: 'Daniel Brog'
		})
	}

	//call geocode util then forecast to get weather data, return json object with temperature/precipitation
	geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
		if (err) {
			return res.send({ err })
		}
		forecast(latitude, longitude, (err, data) => {
			if (err) {
				return res.send({ err })
			}
			const { temperature, precipChance, tempHigh, tempLow, summary } = data
			res.send({
				summary,
				tempHigh,
				tempLow,
				temperature,
				precipChance,
				location: location
			})
		})
	})
})

module.exports = router