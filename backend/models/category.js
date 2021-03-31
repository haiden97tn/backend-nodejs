import mongoose from 'mongoose';
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true
    },
    image: {
        type: String
    }

}, { timestamps: true});

module.exports = mongoose.model("Category", categorySchema);