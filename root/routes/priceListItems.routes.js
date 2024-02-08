const express = require('express');
const { getPriceListById, editPriceList } = require('../controllers/pricelists.controller');
const { getAllPriceListItems } = require('../controllers/priceListItems.controller');

const router = express.Router();

router.get('/get-all-price-list-items', getAllPriceListItems);
router.get('/pricelist-detail/:id', getPriceListById);
router.put('/edit-pricelist', editPriceList);

module.exports = router;
