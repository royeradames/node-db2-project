// import libraries
const express = require('express')
const helmet = require('helmet')
const carsRouter = require('../cars/cars-router')

// import database
const db = require('../data/connections')

// create server
const server = express()

// middleware
server.use(express.json())
server.use(helmet())
server.use('cars/', carsRouter)

// export server
module.exports = server