/* eslint-disable import/no-unresolved */
const express = require('express');
const {
    addPatientAccount, getAllPatientAccounts,
    getPatientAccounts, editPatientAccount,
} = require('../controllers/patientAccount.controller');

const router = express.Router();

router.post('/add', addPatientAccount);
router.get('/fetchAll', getAllPatientAccounts);
router.get('/detail/:id', getPatientAccounts);
router.put('/edit', editPatientAccount);
// router.delete('/delete/:id', deletePatiea);

module.exports = router;
