const mongoose = require('mongoose');

// schema here 

const userSchema = new mongoose.Schema({
      
    name: { type: String, required: true },

    email: { type: String, required: true },

    phone: { type: Number, required: true },

    resume: { type: String, required: true },

});

// create a model from the schema
const User = mongoose.model('User',userSchema);

module.exports = User;