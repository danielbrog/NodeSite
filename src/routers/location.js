const express = require('express')
const router = new express.Router()
const Location = require('../models/location')
const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be an image (jpg,jpeg,png).'))
        }

        cb(undefined, true)
    }
})


router.post('/api/location', upload.single('image'), async (req, res) => {
    const image = req.file.buffer
    const newLoc = new Location({
        ... req.body,
        image: image
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

router.get('/api/:id/image', async (req,res) => {
    try{
        const location = await Location.findById(req.params.id)
        res.set('Content-Type', 'image/png')
        res.status(201).send(location.image)
    } catch (e) {
        res.status(400).send(e)
    }
    
})

module.exports = router