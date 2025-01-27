/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollEmployeeLoanDeductions, getAllPayrollEmployeeLoanDeductions,
    getPayrollEmployeeLoanDeductions, getPayrollEmployeeLoanDeductionsByPayrollID,
    editPayrollEmployeeLoanDeductions, deletePayrollEmployeeLoanDeductions } = require('../controllers/payrollEmployeeLoanDeductions.controller');

const router = express.Router();

router.post('/add', addPayrollEmployeeLoanDeductions);
router.get('/fetchAll', getAllPayrollEmployeeLoanDeductions);
router.get('/detail/:id', getPayrollEmployeeLoanDeductions);
router.get('/by-payroll-id/:id', getPayrollEmployeeLoanDeductionsByPayrollID);
router.put('/edit', editPayrollEmployeeLoanDeductions);
router.delete('/delete/:id', deletePayrollEmployeeLoanDeductions);

module.exports = router;
