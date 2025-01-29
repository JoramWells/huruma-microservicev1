/* eslint-disable import/no-unresolved */
const express = require('express');
const { addProcedureCategory, getAllProcedureCategories, searchProcedureCategory, editProcedureCategory, deleteProcedureCategory } = require('../../controllers/procedure/procedureCategory.controller');

const router = express.Router();

router.post('/add', addProcedureCategory);
router.get('/fetchAll', getAllProcedureCategories);
router.get('/search', searchProcedureCategory);
// router.get('/detail/:id', getProcedurecatById);
router.put('/edit', editProcedureCategory);
router.delete('/delete/:id', deleteProcedureCategory);

module.exports = router;
