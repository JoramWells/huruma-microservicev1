/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollEmployeeMonthlyDeductionFile,
    getAllPayrollEmployeeMonthlyDeductionFiles,
    getPayrollEmployeeMonthlyDeductionFile, getPayrollEmployeeMonthlyDeductionFileByPayrollID, editPayrollEmployeeMonthlyDeductionFile, deletePayrollEmployeeMonthlyDeductionFile } = require('../controllers/payrollEmployeeMonthlyDeductionFiles.controller');


const router = express.Router();

router.post('/add', addPayrollEmployeeMonthlyDeductionFile);
router.get('/fetchAll', getAllPayrollEmployeeMonthlyDeductionFiles);
router.get('/detail/:id', getPayrollEmployeeMonthlyDeductionFile);
router.get('/by-payroll-id/:id', getPayrollEmployeeMonthlyDeductionFileByPayrollID);
router.put('/edit', editPayrollEmployeeMonthlyDeductionFile);
router.delete('/delete/:id', deletePayrollEmployeeMonthlyDeductionFile);

module.exports = router;
