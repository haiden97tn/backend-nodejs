import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 32,
        required: true
    },
    image: {
       type : String
    },
    description: {
        type: String,
        maxLength: 2000
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        required: false,
        type: Boolean
    },
    sold: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: String,
        ref: 'Category',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    count: {
        type: Number
    },
    quantity: {
        type: Number
    }
}, { timestamps: true});

module.exports = mongoose.model("Product", productSchema);