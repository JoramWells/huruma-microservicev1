/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  getAllAdmission,
  getAdmissionDetail, editAdmissionDetail, deleteAdmission, addAdmission,
  getAdmissionDetailByPatientID,
  wardCategories,
} = require('../controllers/admission.controller');

const router = express.Router();

router.post('/add', addAdmission);
router.get('/fetchAll', getAllAdmission);
router.get('/detail/:id', getAdmissionDetail);
router.get('/details/:id', getAdmissionDetailByPatientID);
router.get('/ward-category', wardCategories);
router.put('/edit', editAdmissionDetail);
router.delete('/delete/:id', deleteAdmission);

module.exports = router;
