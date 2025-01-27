/* eslint-disable import/no-unresolved */
const express = require('express');
const {
  addAppointments, getAllAppointments,
  getAppointmentDetail, editAppointmentDetail, deleteAppointment, getAllAppointmentsById,
  getAppointmentPatientQueue,
  getAppointmentByPatientID,
} = require('../controllers/appointment.controller');

const router = express.Router();

// const newAppointment = new Appointment();

router.post('/add', addAppointments);
router.get('/fetchAll', getAllAppointments);
router.get('/queue', getAppointmentPatientQueue);
router.get('/detail/:id', getAppointmentDetail);
router.get('/by-patient-id/:id', getAppointmentByPatientID);
router.get('/details/:id', getAllAppointmentsById);
router.put('/edit', editAppointmentDetail);
router.delete('/delete/:id', deleteAppointment);

module.exports = router;
