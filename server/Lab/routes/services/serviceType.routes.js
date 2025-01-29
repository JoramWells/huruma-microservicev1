/* eslint-disable import/no-unresolved */
const express = require('express');
const { addServiceType, getAllServiceTypes, searchServiceType,
    getServiceTypesById, editServiceType, deleteServiceType } = require('../../controllers/services/serviceType.controller');

const router = express.Router();

router.post('/add', addServiceType);
router.get('/fetchAll', getAllServiceTypes);
router.get('/search', searchServiceType);
router.get('/detail/:id', getServiceTypesById);
router.put('/edit', editServiceType);
router.delete('/delete/:id', deleteServiceType);

module.exports = router;
