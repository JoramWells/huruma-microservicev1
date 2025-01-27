/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addInpatientTreatmentChart, getAllInpatientTreatmentChart,
  getInpatientTreatmentChartDetail, getInpatientTreatmentChartDetailByPatientID,
  deleteInpatientTreatmentChart, editInpatientTreatmentChartDetail,
} = require('../../controllers/inpatient/inpatient.controller');

const router = express.Router();

router.post('/add', addInpatientTreatmentChart);
router.get('/fetchAll', getAllInpatientTreatmentChart);
router.get('/detail/:id', getInpatientTreatmentChartDetail);
router.get('/by-patient-id/:id', getInpatientTreatmentChartDetailByPatientID);
router.put('/edit', editInpatientTreatmentChartDetail);
router.delete('/delete/:id', deleteInpatientTreatmentChart);

module.exports = router;
