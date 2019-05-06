//importing modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')

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

//routing ---
//root
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Daniel Brog'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Daniel Brog'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Need Help?',
		name: 'Daniel Brog',
		helpText: 'Here is some help.'
	})
})

app.get('/weather', (req,res) => {
	res.send({
		location: 'Toronto',
		forecast: 'It is 15 degrees Celsius'
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
