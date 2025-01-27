/* eslint-disable import/no-unresolved */
const express = require('express');
const { addResultStatus, getAllResultStatus,
    getResultStatusDetail, editResultStatus, deleteResultStatus } = require('../../controllers/_lab/resultStatus.controller');

const router = express.Router();

// const newAppointment = new Appointment();

router.post('/add', addResultStatus);
router.get('/fetchAll', getAllResultStatus);
router.get('/detail/:id', getResultStatusDetail);
router.put('/edit', editResultStatus);
router.delete('/delete/:id', deleteResultStatus);

module.exports = router;
