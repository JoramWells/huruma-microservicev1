/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollPeriodEmployeePayCalculations, getAllPayrollPeriodEmployeePayCalculations,
  getPayrollPeriodEmployeePayCalculations, editPayrollPeriodEmployeePayCalculations,
  deletePayrollPeriodEmployeePayCalculations,
  getPayrollEmployeePayCalculationsByPayrollID } = require('../controllers/payrollPeriodEmployeePayCalculations.controller');


const router = express.Router();

router.post('/add', addPayrollPeriodEmployeePayCalculations);
router.get('/fetchAll', getAllPayrollPeriodEmployeePayCalculations);
router.get('/detail/:id', getPayrollPeriodEmployeePayCalculations);
router.get('/by-payroll-id/:id', getPayrollEmployeePayCalculationsByPayrollID);
router.put('/edit', editPayrollPeriodEmployeePayCalculations);
router.delete('/delete/:id', deletePayrollPeriodEmployeePayCalculations);

module.exports = router;
