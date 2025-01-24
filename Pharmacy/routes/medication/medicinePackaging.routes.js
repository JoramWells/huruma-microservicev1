/* eslint-disable import/no-unresolved */
const express = require('express');
const { addMedicinePackaging, getAllMedicinePackaging, getMedicinePackagingDetail,
  editMedicinePackaging, deleteMedicinePackaging } = require('../../controllers/medication/medicinePackaging.controller');


const router = express.Router();

router.post('/add', addMedicinePackaging);
router.get('/fetchAll', getAllMedicinePackaging);
router.get('/detail/:id', getMedicinePackagingDetail);
router.put('/edit', editMedicinePackaging);
router.delete('/delete/:id', deleteMedicinePackaging);

module.exports = router;
