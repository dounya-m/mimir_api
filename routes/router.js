const express = require('express')
const router = express.Router()
const api = '/api/mimir/'

router.use(`${api}admin`, require('./admin/AdmineRoute'))
router.use(`${api}user`, require('./user/UserRoutes'))
router.use(`${api}book`, require('./book/BooksRoute'))
router.use(`${api}comment`, require('./comment/CommentRoute'))
router.use(`${api}request`, require('./request/RequesRoutes'))
module.exports = router