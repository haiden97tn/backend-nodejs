import User from '../models/user';

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next()
    })
}
export const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile)
}

export const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile.id },
        { $set: req.body },
        { new: true},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: 'You are not authorized to perform in action '
                })
            }
            req.profile.hashed_password = undefined;
            req.profile.salt = undefined;
            res.json(user);
        }
    )
}


export const list = (req, res)  => {
    User.find((err, data) => {
        if(err){
            return res.json({
                message: "Không tìm thấy user"
            })
        }
        res.json({ data })
    })
}

export const remove = (req, res) => {
    let profile = req.profile;
    profile.remove((err, deleteProfile) => {
        if (err) {
            return res.status(400).json({
                error: "Khong xoa duoc tai khoan"
            })
        }
        res.json({
            deleteProfile,
            message: "Xoa tai khoan thanh cong"
        })
    })
}