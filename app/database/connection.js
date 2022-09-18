const mongoose = require('mongoose')
require('dotenv').config()

const dbURL = process.env.DB
mongoose.connect(dbURL)

module.exports = mongoose


