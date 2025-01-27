/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPayrollTaxStatus, getAllPayrollTaxStatus, getPayrollTaxStatus, editPayrollTaxStatus, deletePayrollTaxStatus } = require('../controllers/payrollTaxStatus.controller');


const router = express.Router();

router.post('/add', addPayrollTaxStatus);
router.get('/fetchAll', getAllPayrollTaxStatus);
router.get('/detail/:id', getPayrollTaxStatus);
router.put('/edit', editPayrollTaxStatus);
router.delete('/delete/:id', deletePayrollTaxStatus);

module.exports = router;
