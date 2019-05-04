const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/express', (req, res) => {
	res.send('Hello Express!')
})
app.get('/weather', (req,res) => {
	res.send({
		location: 'Toronto',
		forecast: 'It is 15 degrees Celsius'
	})
})




app.listen(3002, () => {
	console.log('Server is up on port 3002')
})
