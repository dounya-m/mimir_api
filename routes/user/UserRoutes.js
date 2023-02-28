const express = require('express');
const router = express.Router();
const { allUsers, createUser, getMe } = require('../../controllers/userController');
const {authToken} = require('../../middlewares/authMiddleware')
router.get('/', allUsers);
router.post('/', createUser);
router.get('/me', authToken ,getMe)

module.exports = router;