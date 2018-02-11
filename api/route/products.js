const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product  = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(item => {
            console.log(item);
            res.status(200).json(item);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(item => {
            console.log(item);
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
       console.log(result);
    }).catch(err => {
        console.log(err);
    });
    res.status(200).json({
        message: 'POST',
        createdProduct: product
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.update({_id: id}, {$set: {name: req.body.name, price: req.body.price}})
        .exec()
        .then(item => {
            res.status(200).json({message: 'Update', product: item});
        })
        .catch(err => {
            console.log('err');
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({_id: id})
        .exec()
        .then(item => {
            res.status(200).json({message: 'Removed', product: item})
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

module.exports = router;