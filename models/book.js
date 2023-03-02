const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    type : {
        type: Array,
        required: [true, 'Type is required'],
    },
    year : {
        type: String,
        required: [true, 'Year is required'],
    },
    image : {
        type: String,
        required: [true, 'Image is required'],
    },
    description : {
        type: String,
        required: [true, 'Description is required'],
    },
    status : {
        type: String,
        enum : ['Available', 'Unavailable'],
        default: 'Available',
        required: [true, 'Status is required'],
    },
    quantity : {
        type: Number,
        required: [true, 'Quantity is required'],
    },

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Book', bookSchema)