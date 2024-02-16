const express = require('express');

const {
  addProcedureGroup, getAllProcedureGroup, getProcedureGroupDetail, editProcedureGroup,
} = require('../../root/controllers/procedure/procedureGroup.controller');

const router = express.Router();

router.post('/add', addProcedureGroup);
router.get('/fetchAll', getAllProcedureGroup);
router.get('/detail/:id', getProcedureGroupDetail);
router.put('/edit', editProcedureGroup);

module.exports = router;
