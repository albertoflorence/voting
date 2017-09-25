console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('./config/config')
const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))


require('./routes')(app)


app.listen(config.port)