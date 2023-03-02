const express = require('express')
const router = express.Router()
const api = '/api/mimir/'

router.use(`${api}user`, require('./user/UserRoutes'))
router.use(`${api}book`, require('./book/BooksRoute'))

module.exports = router