/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../../root/db/connect');
// const Inpatient_case_types = require('../inpatientCaseTypes.model');
// const Patient_details = require('../../../Patients/models/patient2.models');
// const ward_bed = require('../ward/wardBed.model');
// const Admission_category = require('./admissionCategory');

const Admissions = sequelize.define('admissions', {
  admission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  admission_date: {
    type: DataTypes.STRING,
  },
  admission_time: {
    type: DataTypes.STRING,
  },
  discharge_date: {
    type: DataTypes.STRING,
  },
  discharge_time: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  ward_id: {
    type: DataTypes.INTEGER,
  },
  bed_id: {
    type: DataTypes.INTEGER,
  },
  admission_charge: {
    type: DataTypes.INTEGER,
  },
  pay_status: {
    type: DataTypes.INTEGER,
  },
  deposit_amount: {
    type: DataTypes.INTEGER,
  },
  clinical_summary: {
    type: DataTypes.STRING,
  },
  diagnosis: {
    type: DataTypes.STRING,
  },
  doctor_admitting: {
    type: DataTypes.STRING,
  },
  review_date: {
    type: DataTypes.STRING,
  },
  hospital_inpatient_id: {
    type: DataTypes.INTEGER,
  },
  admission_type_id: {
    type: DataTypes.INTEGER,
  },
  doctor_ward_rounds_no_of_days: {
    type: DataTypes.STRING,
  },
  discharge_type_id: {
    type: DataTypes.INTEGER,
  },
  inpatient_case_type_id: {
    type: DataTypes.INTEGER,
  },
  daily_bed_rate: {
    type: DataTypes.INTEGER,
  },
  bed_billing_type_id: {
    type: DataTypes.INTEGER,
  },
  daily_nursing_rate: {
    type: DataTypes.INTEGER,
  },
  // daily_nursing_rate_no_days: {
  //   type: DataTypes.INTEGER,
  // },
  daily_bed_rate_number_of_days: {
    type: DataTypes.INTEGER,
  },
  daily_doctor_ward_round_rate: {
    type: DataTypes.INTEGER,

  },
  bill_daily_doctor_ward_round_charges: {
    type: DataTypes.STRING,
  },
  admission_category_id: {
    type: DataTypes.INTEGER,
  },
  maternity_package_service_type_id: {
    type: DataTypes.INTEGER,
  },
  maternity_package_amount: {
    type: DataTypes.INTEGER,
  },
  package_type: {
    type: DataTypes.INTEGER,
  },
});

// Admissions.belongsTo(ward_bed, { foreignKey: 'bed_id' });
// Admissions.belongsTo(Patient_details, { foreignKey: 'patient_id' });
// Admissions.belongsTo(Admission_category, { foreignKey: 'admission_category_id' });
// Admissions.belongsTo(Inpatient_case_types, { foreignKey: 'inpatient_case_type_id' });

module.exports = Admissions;

// has no classification and status
