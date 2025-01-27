/* eslint-disable import/no-unresolved */
const express = require('express');
const {
    addAccountingDocument, getAllAccountingDocuments,
    getAccountingDocument, editAccountingDocument, deleteAccountingDocument,
} = require('../controllers/accountingDocuments.controller');

const router = express.Router();

router.post('/add', addAccountingDocument);
router.get('/fetchAll', getAllAccountingDocuments);
router.get('/detail/:id', getAccountingDocument);
router.put('/edit/:id', editAccountingDocument);
router.delete('/delete/:id', deleteAccountingDocument);

module.exports = router;
