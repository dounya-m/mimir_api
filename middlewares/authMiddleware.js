const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        const userId = decode.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'Invalid User Id'
        }else{
            next()
        }
    }catch(err){
        res.status(401).json({
            error: new Error('Invalid request!')
            });
    }
}

module.exports = {
    authToken
}