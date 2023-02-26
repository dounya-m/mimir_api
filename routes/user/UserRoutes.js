const express = require('express');
const router = express.Router();
const { allUsers, createUser } = require('../../controllers/userController');

router.route('/').get(allUsers);
router.route('/').post(createUser);

module.exports = router;