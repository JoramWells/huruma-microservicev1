/* eslint-disable import/no-unresolved */
const express = require('express');
const { addInternalLabRequest, getAllInternalLabRequests, getInternalLabRequest,
  editInternalLabRequest, deleteInternalLabRequest,
  getRecentInternalLabRequests,
  updateCollectedSample } = require('../../controllers/_lab/internalLabRequests.controller');


const router = express.Router();

// const newAppointment = new Appointment();

router.post('/add', addInternalLabRequest);
router.get('/fetchAll', getAllInternalLabRequests);
router.get('/requests', getRecentInternalLabRequests);
router.get('/detail/:id', getInternalLabRequest);
router.put('/edit', editInternalLabRequest);
router.put('/update-collected-sample/:id', updateCollectedSample);
router.delete('/delete/:id', deleteInternalLabRequest);

module.exports = router;
