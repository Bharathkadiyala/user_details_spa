const mongoose = require('mongoose');

const dbUri='mongodb+srv://admin:0916@cluster0.0sjjyks.mongodb.net/users_db?retryWrites=true&w=majority';

module.exports = ()=>{
    return mongoose.connect(dbUri)
}