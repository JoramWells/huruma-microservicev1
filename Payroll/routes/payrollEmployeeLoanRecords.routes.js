/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollEmployeeLoanRecords, getAllPayrollEmployeeLoanRecords, getPayrollEmployeeLoanRecords, editPayrollEmployeeLoanRecords, deletePayrollEmployeeLoanRecords } = require('../controllers/payrollEmployeeLoanRecords.controller');


const router = express.Router();

router.post('/add', addPayrollEmployeeLoanRecords);
router.get('/fetchAll', getAllPayrollEmployeeLoanRecords);
router.get('/detail/:id', getPayrollEmployeeLoanRecords);
router.put('/edit', editPayrollEmployeeLoanRecords);
router.delete('/delete/:id', deletePayrollEmployeeLoanRecords);

module.exports = router;
