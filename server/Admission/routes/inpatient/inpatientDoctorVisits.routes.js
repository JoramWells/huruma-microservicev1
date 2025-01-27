/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addInpatientDoctorVisits, getAllInpatientDoctorVisits,
  getInpatientDoctorVisitsDetail, getInpatientDoctorVisitsDetailByPatientID,
  editInpatientDoctorVisitsDetail, deleteInpatientDoctorVisits,
} = require('../../controllers/inpatient/inpatientDoctorVisits.controller');

const router = express.Router();

router.post('/add', addInpatientDoctorVisits);
router.get('/fetchAll', getAllInpatientDoctorVisits);
router.get('/detail/:id', getInpatientDoctorVisitsDetail);
router.get('/by-patient-id/:id', getInpatientDoctorVisitsDetailByPatientID);
router.put('/edit', editInpatientDoctorVisitsDetail);
router.delete('/delete/:id', deleteInpatientDoctorVisits);

module.exports = router;
