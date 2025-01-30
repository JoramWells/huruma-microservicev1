/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const PatientDetails = require('./patientDetails.model');
const Appointments = require('../_appointment/appointments.model');

const OutPatientServicesCervicalCancerScreening = sequelize.define('out_patient_services_cervical_cancer_screening', {
  out_patient_services_ccs_id: {
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
  patient_receiving_via_vili_hpv: {
    type: DataTypes.STRING,
  },
  patient_screened_for_pap_smear: {
    type: DataTypes.STRING,
  },
  patient_screened_for_hpv_test: {
    type: DataTypes.STRING,
  },
  patient_with_positive_via_vili_result: {
    type: DataTypes.STRING,
  },
  patient_with_positive_cytology_result: {
    type: DataTypes.STRING,
  },
  patient_with_positive_hpv_result: {
    type: DataTypes.STRING,
  },
  patient_with_suspicious_cancer_lesions: {
    type: DataTypes.STRING,
  },
  patient_treated_using_cryotherapy: {
    type: DataTypes.STRING,
  },
  patient_treated_using_leep: {
    type: DataTypes.STRING,
  },
  patient_hiv_positive_while_being_screened: {
    type: DataTypes.STRING,
  },
});

OutPatientServicesCervicalCancerScreening.belongsTo(PatientDetails, { foreignKey: 'patient_id' });
OutPatientServicesCervicalCancerScreening.belongsTo(Appointments, { foreignKey: 'appointment_id' });

module.exports = OutPatientServicesCervicalCancerScreening;
