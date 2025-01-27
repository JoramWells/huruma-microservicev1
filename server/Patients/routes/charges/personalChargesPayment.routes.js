/* eslint-disable import/no-unresolved */
const express = require('express');
const { addPersonalChargesPayment, getAllPersonalChargesPayments, getPersonalChargesPayment, editPersonalChargesPayment, deletePersonalChargesPayment, getUserPersonalChargesPayment } = require('../../controllers/charges/personalChargesPayment.controller');

const router = express.Router();

router.post('/add', addPersonalChargesPayment);
router.get('/fetchAll', getAllPersonalChargesPayments);
router.get('/detail/:id', getPersonalChargesPayment);
router.put('/edit', editPersonalChargesPayment);
router.delete('/delete/:id', deletePersonalChargesPayment);
router.get('/user-personal-account-detail/:id', getUserPersonalChargesPayment);

module.exports = router;
