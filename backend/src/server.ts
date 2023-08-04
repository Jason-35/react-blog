require('dotenv').config()
const express = require('express')
const app = express()
const user = require('../controller/user-controller')
const db = require('../database/typeorm.config')

db.connectDB(process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, process.env.MYSQL_DATABASE)

app.get('/k', (req, res) => {
    res.send('Hello World!')
})

app.get('/m', user.register)

app.listen(process.env.HOST, ()=>{
    console.log(`Hosting on PORT ${process.env.HOST}`)
})