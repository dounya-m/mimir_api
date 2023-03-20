const express = require('express');
const router = express.Router();
const { allAdmins, createAdmin, loginAdmin, getMe } = require('../../controllers/admineController');
const {protected} = require('../../middlewares/authMiddleware')


router.get('/', allAdmins);
router.post('/', createAdmin);
router.post('/login', loginAdmin);
router.get('/me', protected ,getMe)

module.exports = router;