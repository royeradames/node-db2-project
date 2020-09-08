// importing library
const knex = require('knex')

// importing files
const knexfile = require('../knexfile')

//applying the development configuration dynamically
const environment = process.env.NODE_ENV || 'development'

const config = knexfile[environment]

module.exports = knex(config)