
import Cart from '../models/cart';
import _ from 'lodash';
import { body, validationResult } from 'express-validator'

export const create = async (req, res) => {

    await body('name').trim().notEmpty().withMessage('khong duoc bo trong').run(req);
    await body('email').trim().notEmpty().withMessage('khong duoc bo trong').run(req);
    await body('address').trim().notEmpty().withMessage('khong duoc bo trong').run(req);

    const check = validationResult(req);
    if (check.isEmpty()) {
        const cart = new Cart(req.body);
        cart.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Khong luu duoc gio hang"
                })
            }
            res.json({ data, message: "Add new cart ok" });

        })
    } else res.json({ error: 'Loi them moi cart' })
}
export const cartById = (req, res, next, id) => {
    Cart.findById(id).exec((err, cart) => {
        if (err || !cart) {
            res.status(400).json({
                error: "Khong tim thay cart"
            })
        }
        req.cart = cart;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.cart)
}

export const remove = (req, res) => {
    let cart = req.cart;
    cart.remove((err, deleteCart) => {
        if (err) {
            return res.status(400).json({
                error: "Khong xoa duoc cart"
            })
        }
        res.json({
            deleteCart,
            message: "Xoa Cart thanh cong"
        })
    })
}
export const list = (req, res) => {
    Cart.find((err, data) => {
        if (err) {
            return res.json(
                { message: "Khong tim thay cart" }
            )
        }
        res.json({ data })
    })
}
export const update = (req, res) => {
    let cart = req.cart;
    cart = _.assignIn(cart, req.body);
    cart.save((err, data) => {
        if (err) {
            console.log(err.message)
            return res.status(400).json({ message: 'error' })
        }
        return res.json(data)
    })
}




