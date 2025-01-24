/* eslint-disable import/no-unresolved */
const express = require('express');
const { addDoctorNotes, getAllDoctorNotes, getDoctorNotesDetail,
  editDoctorNotes, deleteDoctorNotes } = require('../../controllers/doctor/doctorNotes.controller');

const router = express.Router();

router.post('/add', addDoctorNotes);
router.get('/fetchAll', getAllDoctorNotes);
router.get('/detail/:id', getDoctorNotesDetail);
// router.get('/by-maternity-id/:id', getDoctorNotesByMaternityID);
router.put('/edit', editDoctorNotes);
router.delete('/delete/:id', deleteDoctorNotes);

module.exports = router;
