const express = require('express')
const router = express.Router()
const Cart = require('../models/carts');
const products = require('../models/products');

//Add item to users cart
router.post('/', async(req, res)=>{
    //find cart using userid
    let cart = await Cart.findOne({user : req.body.user})
    const productId = req.body.products.product
    // add to cart
    
    if(cart){
        let itemIndex = cart.products.findIndex(p=>p.product == productId)
        console.log(itemIndex)
        if(itemIndex >=0){
            cart.products[itemIndex].quantity+=1 //increase quantity
        } else{
            cart.products.push(req.body.products)
        }
        cart = await cart.save()
        return res.status(200).send(cart)
    } else {
        cart = await Cart.create(req.body);  //create new cart for user
        res.status(201).send(cart)
    }
})

//Get User Cart using user id
router.get('/:userId', async (req, res)=>{
    const cart = await Cart.findOne({user : req.params.userId}).populate('products.product').lean().exec();
    let total = 0;
   for(var i=0;i<cart.products.length; i++){
       total+=cart.products[i].product.price
   }
    res.status(200).send({cart, total})
})

router.get('/', async (req, res)=>{
    const cart = await Cart.find().populate('user').lean().exec();
    res.status(200).send(cart)
})

//Remove item from user cart
router.patch('/', async (req, res)=>{
    let cart = await Cart.findOne({user : req.body.user})
    cartproducts = cart.products
    // console.log('cartproducts', cartproducts)

    cartproducts = cartproducts.filter(p=>{return p.product != req.body.product})

    cart.products = cartproducts

    console.log(cart)
    cart = await cart.save()
    // cart = await Cart.findByIdAndUpdate(cart._id, {products : cartproducts})
    res.status(200).send(cart)
})

module.exports = router