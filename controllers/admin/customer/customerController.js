import mongoose from "mongoose";
import asyncHandler from 'express-async-handler';
import Customer from '../../../model/customerModel.js';
import { unlink } from 'node:fs/promises';
import { dirname } from "../../../index.js";

const ObjectId = mongoose.Types.ObjectId;

export const getCustomer = asyncHandler(async (req, res) => {
    const id = req.query.id;
    const bankId = req.query.bankId;

    if(id) {
        const customer = await Customer.findOne({_id: ObjectId(id)});
        return res.status(200).json(customer);
    }

    if(bankId) {
        const customer = await Customer.find({bank: ObjectId(bankId)});
        return res.status(200).json(customer);
    }
    const customer = await Customer.find();
    res.status(200).json(customer);
})


export const createCustomer = asyncHandler(async (req, res) => {

    const file = req.file;
    try{
        
        let customerData = {
            customerId: req.body.customerId,
            loanACNo: req.body.loanACNo,
            name: req.body.name,
            mobileNo: req.body.mobileNo,
            barcode: req.body.barcode,
            amountPayable: req.body.amountPayable,
            bank: req.body.bank,
            noticeType: req.body.noticeType,
        }
        if(file) {
            customerData.filePath = file.path;
        }
        const customer = await Customer.create(customerData);

        res.status(201).json({
            status: 'success',
            data: customer
        });
    } catch (error) {
        if(file){
            await unlink(file.path);
        }
        throw error;
    }
});


export const editCustomer = asyncHandler(async (req, res) => {
    const file = req.file;
    try{
        const id = req.body.id;

        if(!id){
            throw new Error("Id required");
        };
        if(!req.body.bank){
            throw new Error("Bank required");
        }

        const existCustomer = await Customer.findOne({_id: ObjectId(id)});
        if(existCustomer?.filePath != undefined && existCustomer?.filePath != null){
            await unlink(existCustomer.filePath);
        }

        const customerData = {
            customerId: req.body.customerId,
            loanACNo: req.body.loanACNo,
            name: req.body.name,
            mobileNo: req.body.mobileNo,
            barcode: req.body.barcode,
            amountPayable: req.body.amountPayable,
            bank: req.body.bank,
            noticeType: req.body.noticeType,            
        }
        if(file) {
            customerData.filePath = req.file.path;
        }

        await Customer.updateOne({_id: ObjectId(id)}, customerData);

        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        if(file){
            await unlink(file.path);
        }
        throw error;
    }
});


export const deleteCustomer = asyncHandler(async (req, res) => {
    const id = req.query.id;

    const customer = Customer.findOne({_id: ObjectId(id)});
    if(!customer) {
        res.statusCode = 404
        throw new Error('Server error, Try again ...');
    }
    if(customer.filePath != undefined && customer.filePath != null) {
        await unlink(customer.filePath);
    }
    await Customer.deleteOne({_id: ObjectId(id)});

    res.status(202).json({
        status: 'success',
        message: `deleted ${customer.name}`,
    })

});

export const deleteFile = asyncHandler(async (req, res) => {
    const id = req.query.id;
    if(!id) {
        throw new Error('Id required');
    }
    const data = await Customer.findOne({_id:ObjectId(id)});
    if(!data){
        throw new Error('Id Invalid');
    }
    if(data?.filePath!=undefined || data?.filePath!=null){ 
        await unlink(data.filePath);
        await Customer.updateOne({_id:ObjectId(id)},{$set:{filepath:null}});
    }
    res.status(202).json({
        status: 'success',
        message: `deleted`,
    })
})

export const downloadFile = asyncHandler(async(req, res) => {
    const id = req.query.id;
    if(!id) {
        throw new Error('Id required');
    }
    const data = await Customer.findOne({_id:ObjectId(id)});
    if(!data){
        throw new Error('Id Invalid');
    }
    if(data?.filePath!=undefined || data?.filePath!=null){ 
        const file = `${dirname}/${data.filePath}`;
        res.download(file);
    }
})