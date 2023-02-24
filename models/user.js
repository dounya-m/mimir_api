const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        lowercase: true,
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    image:{
        type: String,
        default: 'https://res.cloudinary.com/dzqjxjx8p/image/upload/v1581081088/avatars/default-avatar.png'
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);