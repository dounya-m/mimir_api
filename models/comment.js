const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    idBook: {
        type: String,
        ref: 'Book',
        required: [true, 'Id is required'],
    },
    idUser: {
        type: String,
        ref: 'User',
        required: [true, 'Id is required'],
    },
    comment: {
        type: String,
        required: [true, 'Comment is required'],
    },
    },
    {
        timestamps: true,
    }
)



module.exports = mongoose.model('Comment', bookSchema)