const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const connDB = require('./config/db')
const {erroHandler} = require('./middlewares/errorMiddleware')
const router = require('./routes/router')

const PORT = process.env.PORT || 5000

const app = express()
connDB()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(router)

app.use(erroHandler)
app.listen(PORT, () =>{
    console.log(`I'm Listen on PORT : ${PORT}`.underline.blue);
})