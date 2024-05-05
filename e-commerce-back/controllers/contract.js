const path = require('path');
const Contract = require('../models/contract');

const createContract = async (req, res) => {
    try {
        const { name, price, description} = req.body.data;
        const newContract = new Contract({ name, price, description});
        await newContract.save();
        res.status(201).json(newContract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a contract', message: error.message });
    }
};

const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.status(200).json(contracts); // Changed from Contracts to contracts
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Contracts', message: error.message });
    }
};

module.exports = {
    createContract,
    getAllContracts
};
