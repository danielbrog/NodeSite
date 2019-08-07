const mongoose = require('mongoose')
const validator = require('validator')

const locationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    tags: {
        type: [String],
        validate(value){
            if(value.length<4){

            }else{
                throw new Error('only 3 tags allowed')
            }
        }
    },
    image: {
        type: Buffer,
        required: true
    },
    coordinates: {
        type: String,
        required: true,
        validate(value){
            if(validator.isLatLong(value)){

            }else{
                throw new Error('Coordinate value formatting incorrect')
            }
        }
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