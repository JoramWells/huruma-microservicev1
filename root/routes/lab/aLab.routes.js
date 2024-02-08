/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addAlab, getAllAlabs, getAlab, editAlab,
} = require('../../controllers/lab/a_lab.controller');

const router = express.Router();

// const newAppointment = new Appointment();

router.post('/add', addAlab);
router.get('/fetchAll', getAllAlabs);
router.get('/detail/:id', getAlab);
router.put('/edit', editAlab);
router.delete('/delete/:id', editAlab);

module.exports = router;
