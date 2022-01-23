const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {type : String, required:true},
    email : {type : String, required:true, unique:true},
    password : {type : String, required:true}
},{
    versionKey:false
})

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    bcryptjs.hash(this.password, 6, (err, hash)=>{
        this.password = hash;
        return next()
    })
})

userSchema.methods.checkPassword = function (password){
    return new Promise((resolve, reject)=>{
        bcryptjs.compare(password, this.password, function(err, same){
            if(err) return reject(err)
            return resolve(same)
        })
    })
}
module.exports = mongoose.model('user', userSchema)
