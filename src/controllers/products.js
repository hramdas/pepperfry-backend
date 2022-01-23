const Product = require('../models/products')
const User = require('../models/users')
const express = require('express')
const router = express.Router()

router.post('/', async(req, res)=>{
    const product = await Product.create(req.body)
    res.status(201).send(product)
})

router.get('/tag', async(req,res)=>{
    let tagname = req.query.name;
    if(tagname){
        let product = await Product.find({tag : tagname})
        return res.status(200).send(product)
    }
    let product = await Product.find()
    return res.status(200).send(product)
})

router.get('/:id', async(req, res)=>{
    const product = await Product.findById(req.params.id)
    return res.status(200).send(product)
})
//get all
router.get('/', async(req, res)=>{
    const products = await Product.find()
    return res.status(200).json(products)
})

//update
router.patch('/:id', async(req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.status(201).send(product)
})

//delete
router.delete('/:id', async(req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(201).send(product)
})

module.exports = router;