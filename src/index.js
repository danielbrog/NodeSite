//importing external modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const { MongoClient, ObjectID } = require('mongodb')

//importing internal modules
const geocode = require(path.join(__dirname, '../src/utils/geocode'))
const forecast = require(path.join(__dirname, '../src/utils/forecast'))
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

//starting up express
const app = express()

//setting pathing for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))
//
app.use(express.json())


//routing ---

//root
app.get('', (req, res) => {
	res.render('index', {
		title: 'Home',
		name: 'Daniel Brog'
	})
})

//users routing
app.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		res.status(201).send(user)
	} catch (e) {
		res.status(400).send(e)
	}
})

app.get('/users', async (req, res) => {

	try {
		const users = await User.find({})
		res.send(users)
	} catch (e) {
		res.status(500).send(e)
	}
})

app.get('/users/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)
		if (!user) {
			res.status(404).send()
		}
		res.send(user)
	} catch (e) {
		res.status(500).send()
	}
})

//tasks routing
app.post('tasks', async (req, res) => {
	const task = new Task(req.body)

	try {
		await task.save()
		res.status(201).send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})

app.get('/tasks', async (req, res) => {

	try {
		const tasks = await Task.find({})
		res.status(201).send(tasks)
	} catch (e) {
		res.status(500).send()
	}
})

app.get('/tasks/:id', async(req, res) => {
	const _id = req.params.id

	try{
		const task = await Task.findById(_id)
		if(!task) {
			res,statys(404).send()
		}
		res.send(task)
	} catch(e){
		res.send(500).send()
	}
})

//basic pages routing
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Daniel Brog'
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

//weather route
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.render('weather', {
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

//admin page

app.get('/admin', (req, res) => {
	res.render('admin')
})
//404 page 
app.get('*', (req, res) => {
	res.render('404', {
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
