const express = require('express');

const {
  addPatients, getAllPatients, getPatientDetail, editPatient, deletePatient,
  searchPatients,
} = require('../controllers/patients.controller');

const router = express.Router();

router.post('/add', addPatients);
router.get('/fetchAll', getAllPatients);
router.get('/detail/:id', getPatientDetail);
router.put('/edit/:id', editPatient);
router.get('/search', searchPatients);
router.delete('/delete/:id', deletePatient);

module.exports = router;
