const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    tags: {
        type: Array,
    },
    image: {
        type: Buffer
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Location = mongoose.model('Location',locationSchema)

module.exports = Location