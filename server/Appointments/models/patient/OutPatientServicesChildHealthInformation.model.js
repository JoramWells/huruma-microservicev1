/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const PatientDetails = require('./patientDetails.model');
const Appointments = require('../_appointment/appointments.model');

const OutPatientServicesChildHealthInformation = sequelize.define('out_patient_services_child_health_information', {
  out_patient_services_chi_id: {
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
  infant_has_kwashiorkor: {
    type: DataTypes.STRING,
  },
  infant_has_marasmus: {
    type: DataTypes.STRING,
  },
  infant_has_faltering_growth: {
    type: DataTypes.STRING,
  },
  infant_has_received_exclusive_breast_feeding: {
    type: DataTypes.STRING,
  },
  infant_has_been_dewormed: {
    type: DataTypes.STRING,
  },
  infant_has_disability: {
    type: DataTypes.STRING,
  },
});

OutPatientServicesChildHealthInformation.belongsTo(PatientDetails, { foreignKey: 'patient_id' });
OutPatientServicesChildHealthInformation.belongsTo(Appointments, { foreignKey: 'appointment_id' });

module.exports = OutPatientServicesChildHealthInformation;
