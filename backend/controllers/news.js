
import New from '../models/new';
import fs from 'fs';
import { request } from 'http';
import _ from 'lodash';
import { body, validationResult } from 'express-validator';


export const create = async(req, res) => {
    // await body('title').trim().notEmpty.withMessage('Hay dien vao title').run(req);
    // await body('content').trim().notEmpty.withMessage('Hay dien vao content').run(req);
    
    
    const check = validationResult(req);
    if(check.isEmpty()){
        const news = new New(req.body);
        news.save((err, data) => {
            if(err){
                res.status(400).json({
                    error: "Khong them duoc tin tuc"
                })
            }
            res.json({ data, message: "Them tin tuc ok"});
        })
    }else{
        res.json({error : 'error'})
    }

}

export const newById = (req, res, next, id) => {
    New.findById(id).exec((err, news) => {
        if(err || !news){
            res.status(400).json({
                error: "Không tìm thấy tin tức"
            })
        }
        req.news = news;
        next();
    })
}

export const read = (req, res) =>{
    return res.json(req.news)
}

export const  remove = (req, res) => {
    let news = req.news;
    news.remove((err, deleteNew) => {
        if(err){
            return res.status(400).json({
                error: "Không xóa được tin tức"
            })
        }
        res.json({
            deleteNew,
            message: "Xóa tin tức thành công"
        })
    })
}
export const list = (req, res)  => {
    New.find((err, data) => {
        if(err){
            return res.json({
                message: "Không tìm thấy tin tức"
            })
        }
        res.json({ data })
    })
}

export const update = (req, res) => {
    let news = req.news;
    news = _.assignIn(news, req.body);
    console.log(news);
    news.save((err, data) => {
        if(err){
            console.log(err.message);
            return res.status(400).json({message: 'error'});
        }
        return res.json({ data, message: 'update news is OK'});
    })
}