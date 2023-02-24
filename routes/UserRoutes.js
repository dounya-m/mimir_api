const router = require('express').Router();
const url = '/api/v1/users/'
const {allUsers} = require('../controllers/userController');

router.get(url, allUsers);