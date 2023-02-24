const express = require('express');
const router = express.Router();
const { allUsers } = require('../../controllers/userController');

router.route('/').get(allUsers);

module.exports = router;