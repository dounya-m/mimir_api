const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connDB = require('./config/db')
const {erroHandler} = require('./middlewares/errorMiddleware')
const router = require('./routes/router')

const PORT = process.env.PORT || 5000

const app = express()
connDB()

app.use(router)
app.use(erroHandler)
app.listen(PORT, () =>{
    console.log(`I'm Listen on PORT : ${PORT}`.underline.blue);
})