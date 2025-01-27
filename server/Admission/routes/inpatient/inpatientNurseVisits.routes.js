/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addInpatientNurseVisits, getAllInpatientNurseVisits,
  getInpatientNurseVisitsDetail, getInpatientNurseVisitsDetailByPatientID,
  editInpatientNurseVisitsDetail, deleteInpatientNurseVisits,
} = require('../../controllers/inpatient/inpatientNurseVisits.controller');

const router = express.Router();

router.post('/add', addInpatientNurseVisits);
router.get('/fetchAll', getAllInpatientNurseVisits);
router.get('/detail/:id', getInpatientNurseVisitsDetail);
router.get('/by-patient-id/:id', getInpatientNurseVisitsDetailByPatientID);
router.put('/edit', editInpatientNurseVisitsDetail);
router.delete('/delete/:id', deleteInpatientNurseVisits);

module.exports = router;
