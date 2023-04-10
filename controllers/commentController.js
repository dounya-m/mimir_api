const Comment = require('../models/comment')

exports.getComments = async(req, res) => {
    const comments = await Comment.find().sort({ createdAt: 'desc' })
    res.status(200).json(comments)
}

exports.addComment = async(req, res) =>{
    console.log(req.body);
    try{
        const {idBook, idUser, comment} = req.body
        if(!idBook || !idUser || !comment){
            res.status(400).json({message: 'The text is required'})
        }
        const singlecomment = await Comment.create({
            idBook,
            idUser,
            comment
        })
        res.status(201).json(singlecomment)
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'})
    }
}

//get the book and user information with id user and is book
exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}