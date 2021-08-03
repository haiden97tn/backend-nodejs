
import Category from '../models/category';
import fs from 'fs';
import { request } from 'http';
import _ from 'lodash';
import { body, validationResult } from 'express-validator';


export const create = async (req, res) => {

    await body('name').trim().notEmpty().withMessage('hay nhap ten').run(req);
    const check = validationResult(req);
    if (check.isEmpty()) {
        const category = new Category(req.body);
        category.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Khong them duoc danh muc"
                })
            }
            res.json({ data, message: "Add new category ok" });
        })
    } else res.json({ error: 'error' })
}

export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Khong tim thay danh muc"
            })
        }
        req.category = category;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.category)
}

export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Khong xoa duoc danh muc"
            })
        }
        res.json({
            deleteCategory,
            message: "Xoa danh muc thanh cong"
        })
    })
}
export const list = (req, res) => {
    Category.find((err, data) => {
        if (err) {
            message: "Khong tim thay danh muc"
        }
        res.json({ data })
    })
}

export const update = (req, res) => {
    let category = req.category;
    category = _.assignIn(category, req.body);
    console.log(category);
    category.save((err, data) => {
        if (err) {
            console.log(err.message);
            return res.status(400).json({ message: 'error' })
        }
        return res.json(data)
    })
}