const express = require('express')
const db = require('../data/connections')

// create router
const router = express.Router()
router.get('/', (req, res) => {
    db('cars')
        .then(carsList => {
            const carListExist = carsList.length
            console.log(carListExist)
            if (carListExist) {
                res.status(200).json(carsList)
            } else {
                res.status(404).json({ message: `No cars on the database` })
            }
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
        .then(count => {
            if (count) res.status(201).json(count)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})
router.put('/:id', validateId, (req, res) => {
    db('cars')
        .where('id', req.params.id)
        .update(req.body)
        .returning('id')
        .then(count => {
            if (count) {
                res.status(201).json(count)
            } else {
                res.status(404).json({ message: `no changes where made` })
            }
        })


})
router.delete('/:id', validateId, (req, res) => {
    db('cars')
        .where('id', req.params.id)
        .del()
        .returning('id')
        .then(count => {
            if (count) {
                res.status(201).json(count)
            } else {
                res.status(404).json({ message: `no changes where made` })
            }
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
function validateId(req, res, next) {

    db('cars')
        .where('id', req.params.id)
        .then(car => {
            if (car) {
                req.car = car
                next()
            } else res.status(404).json({ error: `Id is not found` })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}
module.exports = router
