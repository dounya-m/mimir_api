const Request = require('../models/request');

exports.getRequests = async (req, res) => {
    const requests = await Request.find().sort({ createdAt: 'desc' })
    res.status(200).json(requests)
}

exports.addRequest = async (req, res) => {
    try {
        const { bookName, author, language } = req.body
        if (!bookName || !author || !language) {
            res.status(400).json({ message: 'The text is required' })
        }
        const singlerequest = await Request.create({
            bookName,
            author,
            language
        })
        res.status(201).json(singlerequest)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' })
    }
}