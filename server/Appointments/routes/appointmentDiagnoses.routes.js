/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addAppointmentDiagnoses, getAllAppointmentDiagnoses, getAppointmentDetailDiagnoses,
  getAllAppointmentDiagnosesById, editAppointmentDetailDiagnoses, deleteAppointmentDiagnoses,
} = require('../controllers/appointmentDiagnoses.controller');
// const {
//   addAppointments, getAllAppointments,
//   getAppointmentDetail, editAppointmentDetail, deleteAppointment, getAllAppointmentsById,
// } = require('../controllers/appointment.controller');

const router = express.Router();

// const newAppointment = new Appointment();

router.post('/add', addAppointmentDiagnoses);
router.get('/fetchAll', getAllAppointmentDiagnoses);
router.get('/detail/:id', getAppointmentDetailDiagnoses);
router.get('/detailAll/:id', getAllAppointmentDiagnosesById);
router.put('/edit', editAppointmentDetailDiagnoses);
router.delete('/delete/:id', deleteAppointmentDiagnoses);

module.exports = router;
