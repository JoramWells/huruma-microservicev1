/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addPayrollEmployeeBenefits, getAllPayrollEmployeeBenefits,
  getPayrollEmployeeEmployeeBenefit, editPayrollEmployeeEmployeeBenefit,
  deletePayrollEmployeeEmployeeBenefit,
  getPayrollEmployeeBenefitsByPayrollID,
} = require('../controllers/payrollEmployeeBenefitsFile.controller');

const router = express.Router();

router.post('/add', addPayrollEmployeeBenefits);
router.get('/fetchAll', getAllPayrollEmployeeBenefits);
router.get('/detail/:id', getPayrollEmployeeEmployeeBenefit);
router.get('/by-payroll-id/:id', getPayrollEmployeeBenefitsByPayrollID);
router.put('/edit', editPayrollEmployeeEmployeeBenefit);
router.delete('/delete/:id', deletePayrollEmployeeEmployeeBenefit);

module.exports = router;
