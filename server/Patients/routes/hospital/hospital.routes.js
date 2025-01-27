const express = require('express');
const { addHospitals, getAllHospitals, getHospitalDetail, editHospital, searchHospitals, deleteHospital } = require('../../controllers/hospital/hospital.controller');


const router = express.Router();

router.post('/add', addHospitals);
router.get('/fetchAll', getAllHospitals);
router.get('/detail/:id', getHospitalDetail);
router.put('/edit/:id', editHospital);
router.get('/search', searchHospitals);
router.delete('/delete/:id', deleteHospital);

module.exports = router;
