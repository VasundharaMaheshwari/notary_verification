const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = { userModel };