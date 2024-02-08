const express = require('express');

const {
  addProcedures, getAllProcedures, getProcedureDetail, editProcedure,
} = require('./controllers/procedure/procedure.controller');

const router = express.Router();

router.post('/add', addProcedures);
router.get('/fetchAll', getAllProcedures);
router.get('/detail/:id', getProcedureDetail);
router.put('/edit', editProcedure);

module.exports = router;
