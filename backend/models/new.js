import mongoose from 'mongoose';
const newSchema = mongoose.Schema({
    title: {
        type: String,

    },
    content: {
        type: String,

    },
    image: {
        type: String
    }

}, { timestamps: true});

module.exports = mongoose.model("new", newSchema);