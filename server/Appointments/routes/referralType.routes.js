/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addReferralTypes, getAllReferralTypes, getReferralTypeDetail, getAllReferralTypesById,
  editReferralTypeDetail,
  deleteReferralType,
} = require('../controllers/referralType.controller');

const router = express.Router();

router.post('/add', addReferralTypes);
router.get('/fetchAll', getAllReferralTypes);
router.get('/detail/:id', getReferralTypeDetail);
router.get('/details/:id', getAllReferralTypesById);
router.put('/edit', editReferralTypeDetail);
router.delete('/delete/:id', deleteReferralType);

module.exports = router;
