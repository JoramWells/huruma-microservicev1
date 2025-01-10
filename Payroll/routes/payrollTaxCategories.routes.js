/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollTaxCategories, getAllPayrollTaxCategory, getPayrollTaxCategory, editPayrollTaxCategory, deletePayrollTaxCategory } = require('../controllers/payrollTaxCategories.controller');

const router = express.Router();

router.post('/add', addPayrollTaxCategories);
router.get('/fetchAll', getAllPayrollTaxCategory);
router.get('/detail/:id', getPayrollTaxCategory);
router.put('/edit', editPayrollTaxCategory);
router.delete('/delete/:id', deletePayrollTaxCategory);

module.exports = router;
