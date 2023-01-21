const express = require('express')
const colors = require('colors')

const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, () =>{
    console.log(`I'm Listen on PORT : ${PORT}`.underline.blue);
})