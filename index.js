const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connDB = require('./config/db')
const {erroHandler} = require('./middlewares/errorMiddleware')

const PORT = process.env.PORT || 3000

const app = express()
connDB()


app.use(erroHandler)
app.listen(PORT, () =>{
    console.log(`I'm Listen on PORT : ${PORT}`.underline.blue);
})