/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addMedication, getAllMedication, getMedicationDetail, editMedicationDetail, deleteMedication,
  searchMedication,
} = require('../../controllers/medication/medication.controller');

const router = express.Router();

router.post('/add', addMedication);
router.get('/fetchAll', getAllMedication);
router.get('/search', searchMedication);
router.get('/detail/:id', getMedicationDetail);
router.put('/edit', editMedicationDetail);
router.delete('/delete/:id', deleteMedication);

module.exports = router;
