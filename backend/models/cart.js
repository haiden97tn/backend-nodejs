import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const cartSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    products: {
        type: Array
    },
    status: {
        type: Boolean
    }

});

module.exports = mongoose.model("Cart", cartSchema);