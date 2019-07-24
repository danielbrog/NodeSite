const express = require('express')
const router = new express.Router()
const Location = require('../models/location')

router.post('/api/location', async (req, res) => {
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

router.get('/api/locations', async (req, res) => {
    try{
        const locations = await Location.find()
        res.status(201).send(locations)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router