let customerModel = require('../models/customer.model');
let express = require('express');
let router = express.Router()

//create new customer
//POST localhost:3000/customer
router.post('/customer', (req, res, next) => {
    
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }


    //let user = {
    //    name: 'firstname lastname',
    //    email: 'email@gmail.com'
    //}

    let model = new customerModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
    .catch(err => {
        res.status(500).json(err)
    })
});

//GET
router.get('/customer', (req, res, next) => {
    if (!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    customerModel.findOne({
        email: req.query.email
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});


//UPDATE
router.put('/customer', (req, res, next) => {
    if (!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    customerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//DELETE
router.delete('/customer', (req, res, next) => {
    if (!req.query.email) {
        return res.status(400).send('Missing URL parameter: email')
    }

    customerModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



module.exports = router;