import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Bank from '../../../model/bankModel.js';
import Files from '../../../model/fileModel.js';
import { unlink } from 'node:fs/promises';
import Customers from '../../../model/customerModel.js';
const ObjectId = mongoose.Types.ObjectId;

export const getCustomer = asyncHandler(async (req, res) => {
    const id = req.query.id;

    if(id) {
        const customer = await Customers.findOne({_id: ObjectId(id)});
        res.status(200).json(customer);
    }
    const bank = await Bank.findOne({ $or:[ {'collectionManager': ObjectId(req.user.sub)}, {'legalManager': ObjectId(req.user.sub)} ]});
    const customer = await Customers.aggregate([
        {
            $match: { bank: ObjectId(bank._id)}
        }
    ]);
    res.status(200).json(customer);
});

export const uploadFile = asyncHandler(async (req, res) => {
    try {
        if(!req.body.id){
            throw new Error("Id required");
        };
        const uploadedFile = await Files.create({
            customer: req.body.id,
            filePath: req.file.path
        });

        res.status(200).json(uploadedFile);
        
    } catch (error) {
        if(req.file){
            await unlink(req.file.path);
        }
        throw error;
    }
});

export const deleteFile = asyncHandler(async (req, res) => {
    if(!req.body.id) {
        throw new Error("Id required");
    }
    const file = await Files.findOne({_id: ObjectId(req.body.id)});
    await Files.deleteOne({_id: ObjectId(req.body.id)})
    if(file?.filePath){
        await unlink(file.filePath);
    }
    res.status(200).json(file);
})