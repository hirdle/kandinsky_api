require('dotenv').config();



const {getImage} = require('./getImage.js');

const express = require('express')
const app = express()


app.get('/', async (req, res) => {

    
    const image = await getImage(req.query.q)
    
    res.json({"image": image})
})

app.listen(process.env.APP_PORT, process.env.APP_IP)
// app.listen('8000')
