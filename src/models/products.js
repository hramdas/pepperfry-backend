const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title : {type : String, required:true},
    price : {type : Number, required:true},
    tag : {type : String, required:true},
    images : [{type : String, required:true}],
    rating : {type : Number},
    details : {
        brand : {type : String},
        weight : {type : Number},
        warranty :  {type : Number}
    },
    seller : {type : mongoose.Schema.Types.ObjectId, ref:'sellers'}
},{
    versionKey : false
})

module.exports = mongoose.model('product', productSchema)