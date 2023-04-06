const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const firebaseAdmin = require('firebase-admin');
const validateEmail = require('../middlewares/validateEmail')
const asyncHandler = require('express-async-handler')
const multer = require('multer')
// const upload = require('../middlewares/storageMiddleware');



//all users
exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: 'desc' });
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

exports.createUser =  asyncHandler( async(req, res) => {
    try{
        const {name, lastname, email, password} = req.body
        const user = await User.create({
            name,
            lastname,
            email,
            password
        })
        res.status(200).json({
            success: true,
            data: user
        })
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

exports.loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            success: true,
            data: user,
            token: gnerateToken(user._id)
        })
    }else{
        res.status(400).json({message: 'Invalid email or password'})
    }
})


exports.getMe = async(req, res) => {
    const {_id, name, email, image} = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        data: {
            _id,
            username,
            email,
            image
        }
    }) 
}

const gnerateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
        },
    });
    
    const upload = multer({ storage: storage });