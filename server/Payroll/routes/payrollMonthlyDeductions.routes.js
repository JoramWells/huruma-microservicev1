/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollMonthlyDeduction, getAllPayrollMonthlyDeductions, getPayrollMonthlyDeduction, editPayrollMonthlyDeduction, deletePayrollMonthlyDeduction, getPayrollMonthlyDeductionByPayrollID } = require('../controllers/payrollEmployeeMonthlyDeductions.controller');


const router = express.Router();

router.post('/add', addPayrollMonthlyDeduction);
router.get('/fetchAll', getAllPayrollMonthlyDeductions);
router.get('/detail/:id', getPayrollMonthlyDeduction);
router.get('/by-payroll-id/:id', getPayrollMonthlyDeductionByPayrollID);
router.put('/edit', editPayrollMonthlyDeduction);
router.delete('/delete/:id', deletePayrollMonthlyDeduction);

module.exports = router;
