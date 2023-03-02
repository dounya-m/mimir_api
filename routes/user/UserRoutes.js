const express = require('express');
const router = express.Router();
const { allUsers, createUser, loginUser, getMe } = require('../../controllers/userController');
const {authToken} = require('../../middlewares/authMiddleware')


router.get('/', allUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', authToken ,getMe)

module.exports = router;