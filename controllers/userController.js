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

exports.createUser =  asyncHandler((req, res) => {
    try{
        upload.single('image') (req, res, async(err)  => {
            if (err instanceof multer.MulterError) {
            res.status(400).json({ message: err.message });
            } else if (err) {
            res.status(500).json({ message: err.message });
            } 
                const { username, email, password } = req.body;
                const image = req.file.path;            
                if (!username || !email || !password || !image) {
                    res.status(400).json({ message: 'Missing required fields' });
                }
                const existingUser = await User.findOne({ email: req.body.email });
                    if (existingUser) {
                    return res.status(400).json({ message: 'Email already exists' });
                    }
                if (!validateEmail(email)) {
                    return res.status(400).json({ message: 'Invalid email' });
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
                token: gnerateToken(user._id)
                });
            
        });
    }catch(err){
        console.log(err);
        res.status(400).json({message: "Server error"})
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
    const {_id, username, email, image} = await User.findById(req.user._id)

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