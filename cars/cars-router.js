const express = require('express')
const db = require('../data/connections')

// create router
const router = express.Router()
router.get('/', (req, res)=> {
    db('cars')
    .then(carsList => {
        if(carsList) res.status(200).json(carsList)
        else res.status(404).json({message: `No cars on the database`})
    })
})
router.post('/', validateIncomingData, (req, res) => {
    const newEntry = {
        VIN: req.body.VIN,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage
    }

    db('cars')
        .insert(newEntry)
        .returning('id')
        .then( count => {
            if(count) res.status(201).json(count)
        })
        .catch( error =>{
            res.status(500).json(error.message)
        })
})


// local middleware
function validateIncomingData(req, res, next) {
    const missingRequireData =
        !req.body.VIN &&
        !req.body.make &&
        !req.body.model &&
        !req.body.mileage

    if (missingRequireData) res.status(404).json({ message: `missing require data` })

    next()
}
module.exports = router
