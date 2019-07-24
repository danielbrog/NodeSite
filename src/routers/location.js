const express = require('express')
const router = new express.Router()
const Location = require('../models/location')

router.post('/addLocation', async (req, res) => {
    const newLoc = new Location({
        ... req.body
    })

    try {
		await newLoc.save()
		res.status(201).send(newLoc)
	} catch (e) {
		res.status(400).send(e)
	}
})

router.get('/getLocations', (req, res) => {

})

module.exports = router