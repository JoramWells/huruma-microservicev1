/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollEmployeeTaxFile, getAllPayrollEmployeeTaxFiles, getPayrollEmployeeTaxFile, getPayrollEmployeeTaxFileByPayrollID, editPayrollEmployeeTaxFile, deletePayrollEmployeeTaxFile } = require('../controllers/payrollEmployeeTaxFile.controller');


const router = express.Router();

router.post('/add', addPayrollEmployeeTaxFile);
router.get('/fetchAll', getAllPayrollEmployeeTaxFiles);
router.get('/detail/:id', getPayrollEmployeeTaxFile);
router.get('/by-payroll-id/:id', getPayrollEmployeeTaxFileByPayrollID);
router.put('/edit', editPayrollEmployeeTaxFile);
router.delete('/delete/:id', deletePayrollEmployeeTaxFile);

module.exports = router;
