const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: 32
    },
    hashed_password: {
        type: String,
        require: false,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }

}, { timestamps: true})

userSchema.virtual('password')
    .set(function(password){
        this.salt = uuidv1()
        this.hashed_password = this.encrytPassword(password)
    })

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    encrytPassword: function(password){
        if(!password) return "";
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }catch(error){
            return "";
        }
    }

}


module.exports = mongoose.model("User", userSchema);
