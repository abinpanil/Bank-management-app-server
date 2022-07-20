import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Banks from '../../../model/bankModel.js';
import Users from '../../../model/userModel.js';
const ObjectId = mongoose.Types.ObjectId;

export const getBank = asyncHandler(async (req, res) => {
    const id = req.query.id;

    if(id){
        const bank = await Banks.aggregate([
            {
                $match: {_id: ObjectId(id)}
            },
            {
                $lookup: {
                    "localField":"collectionManager",
                    "from":"users",
                    "foreignField":"_id",
                    "as":"collectionManager"
                }
            },
            {
                $lookup: {
                    "localField":"legalManager",
                    "from":"users",
                    "foreignField":"_id",
                    "as":"legalManager"
                }
            }
        ]);

        return res.status(200).json(bank);
    }

    const bank = await Banks.aggregate([
        {
            $lookup: {
                "localField":"collectionManager",
                "from":"users",
                "foreignField":"_id",
                "as":"collectionManager"
            }
        },
        {
            $lookup: {
                "localField":"legalManager",
                "from":"users",
                "foreignField":"_id",
                "as":"legalManager"
            }
        }
    ]);
    res.status(200).json(bank);
});

export const createBank = asyncHandler(async (req, res) => {
    
    const collectionManagerData = {
        name: req.body.collectionManager,
        username: req.body.collectionManagerUsername,
        password: req.body.collectionManagerPassword
    };

    const legalManagerData = {
        name: req.body.legalManager,
        username: req.body.legalManagerUsername,
        password: req.body.legalManagerPassword,
    };

    const collectionManagerExist = await Users.findOne({username:collectionManagerData.username});
    if(collectionManagerExist) {
        res.statusCode = 400
        throw new Error('Collection Manager Username already exist');
    }

    const legalManagerExist = await Users.findOne({username:legalManagerData.username});
    if(legalManagerExist) {
        res.statusCode = 400
        throw new Error('Legal Manager Username already exist');
    }

    const collectionManager = await Users.create(collectionManagerData);
    const legalManager = await Users.create(legalManagerData);

    const bankData = {
        bankName: req.body.bankName,
        address: req.body.address,
        collectionManager: collectionManager._id,
        legalManager: legalManager._id
    }
    const bank = await Banks.create(bankData);

    res.status(201).json({
        status: 'success',
    });
})

export const editBank = asyncHandler(async (req, res) => {
    const id = req.body.id;
    
    const collectionManagerData = {
        name: req.body.collectionManager,
        username: req.body.collectionManagerUsername,
        password: req.body.collectionManagerPassword
    };

    const legalManagerData = {
        name: req.body.legalManager,
        username: req.body.legalManagerUsername,
        password: req.body.legalManagerPassword,
    };

    const existBankData = await Banks.findOne({_id: ObjectId(id)});
    
    if(!existBankData) {
        res.statusCode = 404
        throw new Error('Server error, Try again ...');
    }

    const collectionManagerExist = await Users.findOne({_id: {$ne: existBankData.collectionManager}, username:collectionManagerData.username});
    if(collectionManagerExist) {
        res.statusCode = 400
        throw new Error('Collection Manager Username already exist');
    }

    const legalManagerExist = await Users.findOne({_id: {$ne: existBankData.legalManager}, username:legalManagerData.username});
    if(legalManagerExist) {
        res.statusCode = 400
        throw new Error('Legal Manager Username already exist');
    }

    const bankData = {
        bankName: req.body.bankName,
        address: req.body.address,
    }

    await Users.updateOne({_id: ObjectId(existBankData.collectionManager)}, collectionManagerData);
    await Users.updateOne({_id: ObjectId(existBankData.legalManager)}, legalManagerData);
    await Banks.updateOne({_id: ObjectId(id)}, bankData);

    res.status(201).json({
        status: 'success',
    });
});

export const deleteBank = asyncHandler(async (req, res) => {

    const id = req.query.id;

    const bank = await Banks.findOne({_id: ObjectId(id)});
    if(!bank) {
        res.statusCode = 404
        throw new Error('Server error, Try again ...');
    }

    await Users.deleteOne({_id: ObjectId(bank.collectionManager)});
    await Users.deleteOne({_id: ObjectId(bank.legalManager)});
    await Banks.deleteOne({_id: ObjectId(id)});

    res.status(202).json({
        status: 'success',
        message: `deleted ${bank.bankName}`,
    })

});