/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addMedicationStockTake, getAllMedicationStockTake, getMedicationStockTakeRange,
  getMedicationStockTakeDetail, editMedicationStockTake, deleteMedicationStockTake,
  getAllMedicationStockTakeDetail,
} = require('../../controllers/medication/medicineStockTake.controller');

const router = express.Router();

router.post('/add', addMedicationStockTake);
router.get('/fetchAll', getAllMedicationStockTake);
router.get('/detail/:id', getMedicationStockTakeDetail);
router.get('/details/:id', getAllMedicationStockTakeDetail);
router.put('/edit', editMedicationStockTake);
router.delete('/delete/:id', deleteMedicationStockTake);
router.get('/stock-take-series', getMedicationStockTakeRange);


module.exports = router;
