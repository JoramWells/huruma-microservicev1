/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const PatientDetails = require('./patientDetails.model');
const Appointments = require('../_appointment/appointments.model');

const OutPatientANCServices = sequelize.define('out_patient_services_anc', {
  out_patient_services_anc_id: {
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
  patient_given_ipt_first_dose: {
    type: DataTypes.STRING,
  },
  patient_given_ipt_second_dose: {
    type: DataTypes.STRING,
  },
  patient_with_hb_less_than_eleven_g_dl: {
    type: DataTypes.STRING,
  },
  llitns_distributed_to_under_one_year: {
    type: DataTypes.STRING,
  },
  llitns_distributed_to_anc_client: {
    type: DataTypes.STRING,
  },
  tested_for_syphilis: {
    type: DataTypes.STRING,
  },
  tested_positive_for_syphilis: {
    type: DataTypes.STRING,
  },
  counselled_on_infant_feeding_options: {
    type: DataTypes.STRING,
  },
  breast_examination_done_on_patient: {
    type: DataTypes.STRING,
  },
  patient_given_exercise: {
    type: DataTypes.STRING,
  },
  presenting_with_pregnancy: {
    type: DataTypes.STRING,
  },
  patient_issued_with_iron: {
    type: DataTypes.STRING,
  },
  patient_issued_with_folic: {
    type: DataTypes.STRING,
  },
  patient_issued_with_combined_ferrous_folate: {
    type: DataTypes.STRING,
  },
});

OutPatientANCServices.belongsTo(PatientDetails, { foreignKey: 'patient_id' });
OutPatientANCServices.belongsTo(Appointments, { foreignKey: 'appointment_id' });

module.exports = OutPatientANCServices;
