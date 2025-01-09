/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollPeriod, getAllPayrollPeriods, getPayrollPeriod, editPayrollPeriod, deletePayrollPeriod } = require('../controllers/payrollPeriods.controller');


const router = express.Router();

router.post('/add', addPayrollPeriod);
router.get('/fetchAll', getAllPayrollPeriods);
router.get('/detail/:id', getPayrollPeriod);
router.put('/edit', editPayrollPeriod);
router.delete('/delete/:id', deletePayrollPeriod);

module.exports = router;
