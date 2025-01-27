/* eslint-disable import/no-unresolved */
const express = require('express');
const {
    addCashPaymentModes, getAllCashPaymentModes,
    getCashPaymentModesDetail, editCashPaymentModes, deleteCashPaymentModes,
} = require('../controllers/cashPaymentModes.controller');

const router = express.Router();

router.post('/add', addCashPaymentModes);
router.get('/fetchAll', getAllCashPaymentModes);
router.get('/detail/:id', getCashPaymentModesDetail);
router.put('/edit', editCashPaymentModes);
router.delete('/delete/:id', deleteCashPaymentModes);

module.exports = router;
