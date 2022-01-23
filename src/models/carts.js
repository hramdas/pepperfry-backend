const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref:'user'},
    products : [{ 
        product : {type : mongoose.Schema.Types.ObjectId, ref:'product'},
        quantity : {type : Number, default : 1}
    }]
},{
    versionKey : false
})

module.exports = mongoose.model('cart', cartSchema)