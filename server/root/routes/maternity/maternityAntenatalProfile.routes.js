/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addMaternityAntenatalProfile, getAllMaternityAntenatalProfile,
  getMaternityAntenatalProfileDetail, editMaternityAntenatalProfile,
  deleteMaternityAntenatalProfile,
  getMaternityAntenatalProfileByMaternityID,
} = require('../../controllers/maternity/maternityAntenatalProfile.controller');

const router = express.Router();

router.post('/add', addMaternityAntenatalProfile);
router.get('/fetchAll', getAllMaternityAntenatalProfile);
router.get('/detail/:id', getMaternityAntenatalProfileDetail);
router.get('/by-maternity-id/:id', getMaternityAntenatalProfileByMaternityID);
router.put('/edit', editMaternityAntenatalProfile);
router.delete('/delete/:id', deleteMaternityAntenatalProfile);

module.exports = router;
