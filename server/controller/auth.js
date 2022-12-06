const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
require('../database/connection')



const multer = require('multer')
var path = require('path');
const excelToJson = require('convert-excel-to-json');
const xlsxj = require("xlsx-to-json-lc");

//Database

const dataSchema = {
    name: String,
    email: String,
    id: String
}

const dataModel = mongoose.model("data", dataSchema)

//counter schema

const counterSchema = {
    id: {
        type: String
    },
    seq: {
        type: Number
    }
}

const counterModel = mongoose.model("counter", counterSchema)


router.post('/postData', async (req, res) => {

    try {
        const res = req.body;
        console.log(res)


        counterModel.findOneAndUpdate(
            { id: "autoVal" },
            { "$inc": { "seq": 1 } }, {
            new: true
        }, async (err, cd) => {
            let seqId;
            if (cd == null) {
                const newVal = new counterModel({
                    id: "autoVal",
                    seq: 1
                })
                newVal.save()
                seqId = 1
            } else {
                seqId = cd.seq
            }

            const data = new dataModel({
                name: res.name,
                email: res.email,
                id: `PR/FY22-23/${seqId}`
            })

            const result = await data.save();
        }
        )



    } catch (error) {
        console.log(error)
    }
})




module.exports = router;