// import libraries
const express = require('express')
const helmet = require('helmet')
const carsRouter = require('../cars/cars-router')

// create server
const server = express()

// middleware
server.use(express.json())
server.use(helmet())
server.use('cars/', carsRouter)

server.get('/', (req,res) => {
    res.status(200).json({message: `
    Welcome to the cars app. Do '/cars' to have access to the car database
    `})
})

// export server
module.exports = server