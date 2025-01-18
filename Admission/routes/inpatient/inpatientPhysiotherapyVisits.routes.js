/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addInpatientPhysiotherapistVisits, getAllInpatientPhysiotherapistVisits,
  getInpatientPhysiotherapistVisitsDetail,
  getInpatientPhysiotherapistVisitsDetailByPatientID,
  editInpatientPhysiotherapistVisitsDetail, deleteInpatientPhysiotherapistVisits,
} = require('../../controllers/inpatient/inpatientPhysiotherapistVisits.controller');

const router = express.Router();

router.post('/add', addInpatientPhysiotherapistVisits);
router.get('/fetchAll', getAllInpatientPhysiotherapistVisits);
router.get('/detail/:id', getInpatientPhysiotherapistVisitsDetail);
router.get('/by-patient-id/:id', getInpatientPhysiotherapistVisitsDetailByPatientID);
router.put('/edit', editInpatientPhysiotherapistVisitsDetail);
router.delete('/delete/:id', deleteInpatientPhysiotherapistVisits);

module.exports = router;
