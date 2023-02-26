const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const firebaseAdmin = require('firebase-admin');
const multer = require('multer')
const upload = require('../middlewares/storageMiddleware');
const validateEmail = require('../middlewares/validateEmail')



//all users
exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (error) {
        next(error)
    }
}

exports.createUser = async (req, res) => {
    try{
        upload.single('image')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
            res.status(400).json({ message: err.message });
            } else if (err) {
            res.status(500).json({ message: err.message });
            } else {
            const { username, email, password } = req.body;
            const image = req.file.path;            
            if (!username || !email || !password || !image) {
                res.status(400).json({ message: 'Missing required fields' });
            }else if (!validateEmail(email)) {
                res.status(400).json({ message: 'Invalid email address' });
            }
                const user = await User.create({
                username,
                email,
                image,
                password,
                });
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
                await user.save();
                res.status(201).json({
                success: true,
                data: user,
                });
            }
        });
    }catch(err){
        res.status(400).json({message: "Server error"})
    }
}
