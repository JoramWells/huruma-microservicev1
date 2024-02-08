/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addAdmission, getAllAdmission,
  getAdmissionDetail, editAdmissionDetail, deleteAdmission,
} = require('../../controllers/admission/admission.controller');

const router = express.Router();

router.post('/add', addAdmission);
router.get('/fetchAll', getAllAdmission);
router.get('/detail/:id', getAdmissionDetail);
router.put('/edit', editAdmissionDetail);
router.delete('/delete/:id', deleteAdmission);

module.exports = router;
