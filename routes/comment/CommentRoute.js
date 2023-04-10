const express = require('express')
const router = express.Router()
const {getComments, addComment, getComment} = require('../../controllers/commentController')

router.get('/', getComments)
router.post('/', addComment)
router.get('/:id', getComment)


module.exports = router;