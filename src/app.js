//importing external modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const mysql = require('mysql')

//importing internal modules
const geocode = require(path.join(__dirname, '../src/utils/geocode'))
const forecast = require(path.join(__dirname, '../src/utils/forecast'))

//starting up express
const app = express()

//setting pathing for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setting up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

//connectinog to db
const options = {
	user: 'daniel',
	password: 'zaq1',
	database: 'danielDB'
  }
  const connection = mysql.createConnection(options)

  connection.connect(err => {
	if (err) {
	  console.error('An error occurred while connecting to the DB')
	  throw err
	}
  })

  connection.query('SELECT 1+1 AS Solution', (err,res,field) =>{
	  if (err) throw err;
	  console.log('The solution is: ', res[0].Solution)
  })

//routing ---
//root
app.get('', (req, res) => {
	res.render('index', {
		title: 'Home',
		name: 'Daniel Brog'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Daniel Brog'
	})
})

app.get('/weather', (req,res) => {
	if(!req.query.address){
		return res.render('weather',{
			title: 'Weather',
			name: 'Daniel Brog'
		})
	}

	//call geocode util then forecast to get weather data, return json object with temperature/precipitation
	geocode(req.query.address, (err, {latitude, longitude, location}={}) => {
		if(err){
		return res.send({err})
		}
		forecast(latitude,longitude, (err, data) => {
			if(err){
				return res.send({err})
			}
			const {temperature, precipChance, tempHigh, tempLow, summary}=data
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

app.get('/app', (req, res) => {
	res.render('AppList', {
		title: 'List of Apps',
		name: 'Daniel Brog'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Need Help?',
		name: 'Daniel Brog',
		helpText: 'If you need any help, or have comments/concerns please let me know at: ',
		email: 'brog.daniel@gmail.com'
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		error: '404',
		errorMessage: 'Help article not found',
		name: 'Daniel Brog'
	})

})
//404 page 
app.get('*', (req, res) => {
	res.render('404',{
		error: '404',
		errorMessage: 'Page not found',
		name: 'Daniel Brog'
	})

})
//end routing ---


//start server on port 3002
app.listen(3002, () => {
	console.log('Server is up on port 3002')
})
