const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlists')

router.post('/', async(req, res)=>{
    let wishlist = await Wishlist.findOne({user : req.body.user})

    if(wishlist){
        let itemIndex = wishlist.products.findIndex(p=> p == req.body.products)
        // console.log(req.body.products, wishlist.products)

        if(itemIndex < 0){
            wishlist.products.push(req.body.products)
        }
        wishlist = await wishlist.save()
        return res.status(200).send(wishlist)
    } else {
        wishlist = await Wishlist.create(req.body);  
        return res.status(201).send(wishlist)
    }
})

router.patch('/', async(req, res)=>{
    let wishlist = await Wishlist.findOne({user : req.body.user})

    if(wishlist){
        let liststatus = wishlist.products.findIndex(p=>{
            p == req.body.product
        })
       
        if(liststatus < 0){
            wishlist.products.push(req.body.products)
        }
        wishlist = await wishlist.save()
        return res.status(200).send(wishlist)
    } else {
        wishlist = await Wishlist.create(req.body);  
        return res.status(201).send(wishlist)
    }
})

router.get('/:userId', async (req, res)=>{
    const wishlist = await Wishlist.findOne({user : req.params.userId}).populate('products').lean().exec();
    res.status(200).send(wishlist)
})

module.exports = router