const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({

    bookName : {
        type: String,
        required: [true, 'Book name is required'],
    },
    author : {
        type: String,
        required: [true, 'Author is required'],
    },
    language : {
        type: String,
        required: [true, 'Languege is required'],
    }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Request', bookSchema)