/* eslint-disable import/no-unresolved */
const express = require('express');
const { addMaternityDelivery, getAllMaternityDeliveries, getMaternityDeliveryDetail, editMaternityDelivery, deleteMaternityDelivery } = require('../../controllers/maternity/maternityDeliveries.controller');

const router = express.Router();

router.post('/add', addMaternityDelivery);
router.get('/fetchAll', getAllMaternityDeliveries);
router.get('/detail/:id', getMaternityDeliveryDetail);
router.put('/edit', editMaternityDelivery);
router.delete('/delete/:id', deleteMaternityDelivery);

module.exports = router;
