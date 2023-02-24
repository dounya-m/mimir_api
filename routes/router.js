const express = require('express')
const router = express.Router()
const api = '/api/mimir/'

router.use(`${api}user`, require('./user/UserRoutes'))

module.exports = router