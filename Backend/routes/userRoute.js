const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const User = require('../models/userDetails.model')
const { validateDbId, raiseRecord404Error } = require('../middlewares/app');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
}).single("user_file");

router.post('/', upload, (req, res, next) => {
    console.log(req.file)
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        class: req.body.class,
        phonenumber: req.body.phonenumber,
        user_file: req.file.filename
    }
    User.create(newUser)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.get('/', (req, res) => {
    User.find()
        .then(data => res.send(data))
        .catch(error => next(error))
})

router.get('/:id', validateDbId, (req, res) => {
    User.findById(req.params.id)
        .then(data => {
            if (data)
                res.send(data)
            else
                raiseRecord404Error(req, res)
        })
        .catch(error => next(error))
})


router.put('/:id',upload,validateDbId, (req, res) => {
    console.log(req.file)
    const udpatedUser = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        class: req.body.class,
        phonenumber: req.body.phonenumber,
        user_file: req.file.filename
    }
    User.findByIdAndUpdate(req.params.id, udpatedUser)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(error => next(error))
})

router.delete('/:id', validateDbId, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(data => {
            if (data) {
                console.log(data);
                fs.unlink('uploads/' + data.user_file, (err) => {
                    if (err) {
                        throw err;
                    }
                    res.send(data)
                    console.log("Delete File successfully.");
                });
            }
            else raiseRecord404Error(req, res)
        })
        .catch(error => next(error))
})
module.exports = router;