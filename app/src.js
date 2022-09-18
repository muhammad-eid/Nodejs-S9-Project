require('./database/connection')
const express = require('express')
const userRoutes = require('./routes/user.route')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, './public')))
app.use(userRoutes)

module.exports = app