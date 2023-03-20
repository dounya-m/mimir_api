const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateEmail = require('../middlewares/validateEmail')
const asyncHandler = require('express-async-handler')
const multer = require('multer')



//all Admins
exports.allAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({
            success: true,
            count: admins.length,
            data: admins
        })
    } catch (error) {
        next(error)
    }
}

exports.createAdmin =  asyncHandler((req, res) => {
    try{
        upload.single('image') (req, res, async(err)  => {
            if (err instanceof multer.MulterError) {
            res.status(400).json({ message: err.message });
            } else if (err) {
            res.status(500).json({ message: err.message });
            } 
                const { name, email, password } = req.body;
                const image = req.file.path;
                            
                if (!name || !email || !password || !image) {
                    res.status(400).json({ message: 'Missing required fields' });
                }
                const existingAdmin = await Admin.findOne({ email: req.body.email });
                    if (existingAdmin) {
                    return res.status(400).json({ message: 'Email already exists' });
                    }
                if (!validateEmail(email)) {
                    return res.status(400).json({ message: 'Invalid email' });
                }
                const admin = await Admin.create({
                name,
                email,
                image,
                password,
                });
                const salt = await bcrypt.genSalt(10)
                admin.password = await bcrypt.hash(admin.password, salt)
                await admin.save();
                res.status(201).json({
                success: true,
                data: admin,
                token: gnerateToken(admin._id)
                });
            
        });
    }catch(err){
        console.log(err);
        res.status(400).json({message: "Server error"})
    }
})

exports.loginAdmin = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})

    if(admin && (await bcrypt.compare(password, admin.password))){
        res.status(200).json({
            success: true,
            data: admin,
            token: gnerateToken(admin._id)
        })
    }else{
        res.status(400).json({message: 'Invalid email or password'})
    }
})


exports.getMe = async(req, res) => {
    const {_id, name, email, image} = await Admin.findById(req.admin._id)

    res.status(200).json({
        success: true,
        data: {
            _id,
            name,
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