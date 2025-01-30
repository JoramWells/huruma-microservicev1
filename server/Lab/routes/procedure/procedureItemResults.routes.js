/* eslint-disable import/no-unresolved */
const express = require('express');
const { addProcedureItemResults, getAllProcedureItemResults, editProcedureItemResult, deleteProcedureItemResult, getProcedureItemResult } = require('../../controllers/procedureItemsResults.controller');

const router = express.Router();

router.post('/add', addProcedureItemResults);
router.get('/fetchAll', getAllProcedureItemResults);
router.get('/detail/:id', getProcedureItemResult);
router.put('/update/:id', editProcedureItemResult);
router.delete('/delete/:id', deleteProcedureItemResult);

module.exports = router;
