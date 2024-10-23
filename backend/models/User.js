const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true,},
    role: { type: String, enum: ['customer', 'admin', 'support_engineer'], required: true },
    firstName: { type: String },
    lastName: { type: String },  
    phoneNumber: { type: String, unique: true },
    location: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
