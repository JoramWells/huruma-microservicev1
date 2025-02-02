/* eslint-disable import/no-unresolved */
const express = require('express');
const { addProcedureDetail, getAllProcedureDetails, getProcedureDetailsById, editProcedureDetail, deleteProcedureDetail, searchProcedureDetail } = require('../../controllers/procedureDetails.controller');

const router = express.Router();

router.post('/add', addProcedureDetail);
router.get('/fetchAll', getAllProcedureDetails);
router.get('/search', searchProcedureDetail);
router.get('/detail/:id', getProcedureDetailsById);
router.put('/edit', editProcedureDetail);
router.delete('/delete/:id', deleteProcedureDetail);

module.exports = router;
