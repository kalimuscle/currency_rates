const Currency = require('../models/Currency');  

exports.getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find();
        res.status(200).json(currencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCurrency = async (req, res) => {
    try {
        const { name } = req.body;
        const currency = new Currency({ name, rate: 1 });
        await currency.save();
        res.status(201).json(currency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

