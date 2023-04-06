const express = require('express')
const router = express.Router()
const {getBooks, addBook, getTypes, getYears} = require('../../controllers/bookController')

router.get('/', getBooks)
router.post('/', addBook)
router.get('/type', getTypes)
router.get('/years', getYears)


module.exports = router;