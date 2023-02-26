const mongoose = require('mongoose')


const connDB =  async() => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB are Connected: ${conn.connection.host}` .underline.yellow);
    }catch(error){
        console.log(error);
        process.exit(1)
    }
} 
module.exports = connDB