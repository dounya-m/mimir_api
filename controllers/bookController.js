const Book = require('../models/book')

exports.getBooks = async(req, res) => {
    const books = await Book.find()
    res.status(200).json({
        success : true,
        count : books.length,
        data : books
    })
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
        res.status(201).json({
            success: true,
            data : book
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'})
    }
}