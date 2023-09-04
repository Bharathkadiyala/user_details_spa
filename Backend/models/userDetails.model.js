const mongoose = require('mongoose');

module.exports = mongoose.model('Userdetail',{
    name:{type:String},
    email:{type:String},
    address:{type:String},
    class:{type:String},
    phonenumber:{type:String},
    user_file:{type:String}
});