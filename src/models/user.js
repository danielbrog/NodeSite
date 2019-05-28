const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (validator.isLength(value, {max:6})){
                throw new Error('Password is not long enough, must be 7 characters or longer')
            }
            if(validator.contains(value.toLowerCase(),'password')){
                throw new Error('Password cannot contain "password"')
            }

        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.generateAuthToken = async function () {

    const token = jwt.sign({_id: this.id.toString()},process.env.JWT_SECRET)

    this.tokens = this.tokens.concat({ token})
    await this.save()
    
    return token
}

userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//funcitons
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//middleware
//Hashing password before saving
userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

//delete user tasks when users are removed
userSchema.pre('remove', async function (next) {
    await Task.deleteMany({author: this._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User