const { log } = require('firebase-functions/logger')
const Book = require('../models/book')

exports.getBooks = async(req, res) => {
    const books = await Book.find().sort({ createdAt: 'desc' })
    res.status(200).json(books)
}

exports.addBook = async(req, res) =>{
    try{
        const {title, author, type, year, image, description, status, quantity} = req.body

        // if(!title || !author || !type || !year || !image || !description || !status || !quantity){
        //     res.status(400).json({message: 'The text is required'})
        // }
        const book = await Book.create({
            title,
            author,
            type,
            year,
            image,
            description,
            status,
            quantity
        })
        await book.save()
        res.status(201).json(book)

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'})
    }
}

exports.getTypes = async(req, res) => {
    const types = await Book.find().distinct('type')
    const singleType = Array.from(new Set(types)).sort()
    res.status(200).json(singleType)
}

exports.getYears = async (req, res) => {
try {
        const years = await Book.find().distinct('year')
        const yearMap = years.map(year => year.split(' ', 3)[2])
        const singleYear = Array.from(new Set(yearMap)).sort()
        res.status(200).json(singleYear)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}  

exports.SingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json(book)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

