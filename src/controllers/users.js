const expresss =  require('express')
const router = expresss.Router()
const User = require('../models/users')

router.post("/signup", async (req, res)=>{
    try{
        let user = await User.findOne({email : req.body.email}).lean().exec()
        if(user) return res.status(400).send({status : "failed", message : "User already registered"})

        user = await User.create(req.body);

        res.status(201).send(user)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }}
)

router.post('/login', async (req, res)=>{
    try{
        let user = await User.findOne({email : req.body.email})
       
        if(!user) return res.status(400).send({status : failed, message : "Please check email and password"})
        //check password match
        const match = await user.checkPassword(req.body.password)

        if(!match) return res.status(400).send({status : failed, message : "Please check email and password"})
        res.status(201).send(user)

    }catch(err){
        res.status(500).json({message : err.message})
    }
})

router.get('', async(req, res)=>{
    let user = await User.find().lean().exec();
    res.status(200).json(user)
})

module.exports = router