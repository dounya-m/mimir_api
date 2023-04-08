const express = require('express')
const router = express.Router()
const {getBooks, addBook, getTypes, getYears, SingleBook} = require('../../controllers/bookController')

router.get('/', getBooks)
router.post('/', addBook)
router.get('/type', getTypes)
router.get('/years', getYears)
router.get('/:id', SingleBook)
module.exports = router;