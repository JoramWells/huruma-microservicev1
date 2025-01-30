/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const PatientDetails = require('./patientDetails.model');
const Appointments = require('../_appointment/appointments.model');

const OutPatientPNCServices = sequelize.define('out_patient_services_pnc', {
  out_patient_services_pnc_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // defaultValue: UUIDV4,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  breast_examination_done: {
    type: DataTypes.STRING,
  },
  patient_counselled: {
    type: DataTypes.STRING,
  },
  patient_has_fistula: {
    type: DataTypes.STRING,
  },
  pnc_given_exercise: {
    type: DataTypes.STRING,
  },
  cervical_cancer_patient: {
    type: DataTypes.STRING,
  },
  mother_received_post_partum_care: {
    type: DataTypes.STRING,
  },
  infant_received_post_partum_care: {
    type: DataTypes.STRING,
  },
});

OutPatientPNCServices.belongsTo(PatientDetails, { foreignKey: 'patient_id' });
OutPatientPNCServices.belongsTo(Appointments, { foreignKey: 'appointment_id' });

module.exports = OutPatientPNCServices;
