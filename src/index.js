//importing external modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')


//setting pathing for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

//routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const barPagesRouter = require('./routers/barPages')
const weatherRouter = require('./routers/weather')

//db start
require('./db/mongoose')

//starting up express
const app = express()

//setting up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))
app.use(express.json())

//routing ---

//Routing using express router
//user and task router
app.use(userRouter)
app.use(taskRouter)
//basic pages routing
app.use(barPagesRouter)
//weather route
app.use(weatherRouter)

//ExpenseApp routing
app.use('/ExpenseApp/',express.static(path.join(publicDirectoryPath, 'ReactApps','ExpensifyApp')))
app.get('/ExpenseApp/', (req, res) => {
	res.sendFile(path.join(publicDirectoryPath, 'ReactApps','ExpensifyApp', 'index.html'))
})

//root (react homepage) routing
app.use('/',express.static(path.join(publicDirectoryPath, 'ReactApps','HomePage')))
app.get('/', (req, res) => {
	res.sendFile(path.join(publicDirectoryPath, 'ReactApps','HomePage', 'index.html'))
})

//admin page
app.get('/admin', (req, res) => {
	res.render('admin/admin')
})

//404 page 
app.get('*', (req, res) => {
	res.render('mainpages/404', {
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