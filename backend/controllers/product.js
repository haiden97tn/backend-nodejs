
import Product from '../models/product';
import _ from 'lodash';
import { body, validationResult } from 'express-validator'

export const create = async (req, res) => {

    await body('name').trim().notEmpty().withMessage('khong duoc bo trong').run(req);
    await body('price').notEmpty().isNumeric().withMessage('nhap so').run(req);
    await body('quantity').notEmpty().isNumeric().withMessage('nhap so').run(req);


    const check = validationResult(req);
    if (check.isEmpty()) {
        const product = new Product(req.body);
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Khong them duoc san pham"
                })
            }
            res.json({ data, message: "Add new product ok" });

        })
    } else res.json({ error: 'error' })
}

export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Khong tim thay san pham"
            })
        }
        req.product = product;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.product)
}

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Khong xoa duoc san pham"
            })
        }
        res.json({
            deleteProduct,
            message: "Xoa san pham thanh cong"
        })
    })
}
export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            return res.json(
                { message: "Khong tim thay san pham" }
            )
        }
        res.json({ data })
    })
}

export const listMan = (req, res) => {
    Product.find({ categoryId: "60b4507fcf45f22d28889706" }, (err, data) => {
        if (err) {
            console.log(err.message)
            return res.json(
                { message: "Khong tim thay san pham" }
            )
        }
        res.json({ data })
    }).limit(6)
}

export const listWoman = (req, res) => {
    Product.find({ categoryId: "605c4d0146ff6c3260f1b73f" }, (err, data) => {
        if (err) {
            console.log(err.message)

            return res.json(
                { message: "Khong tim thay san pham" }
            )
        }
        res.json({ data })
    }).limit(6)
}

export const update = (req, res) => {
    let product = req.product;
    product = _.assignIn(product, req.body);

    product.save((err, data) => {
        if (err) {
            console.log(err.message)
            return res.status(400).json({ message: 'error' })
        }
        return res.json(data)
    })
}


