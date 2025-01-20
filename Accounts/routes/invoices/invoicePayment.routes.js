/* eslint-disable import/no-unresolved */
const express = require('express');
const {
    addInvoicePaymentDetail, getAllInvoicePayments,
    getInvoicePaymentDetail, editInvoicePaymentDetail, deleteInvoicePaymentDetail,
} = require('../../controllers/invoice/invoicePayments.controller');

const router = express.Router();

router.post('/add', addInvoicePaymentDetail);
router.get('/fetchAll', getAllInvoicePayments);
router.get('/detail/:id', getInvoicePaymentDetail);
router.put('/edit', editInvoicePaymentDetail);
router.delete('/delete/:id', deleteInvoicePaymentDetail);

module.exports = router;
