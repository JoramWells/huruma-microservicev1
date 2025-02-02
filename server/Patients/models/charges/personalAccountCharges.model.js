/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const PatientDetails = require('../patientDetails.models');
const Appointments2 = require('../appointment/appointments.model');
const Service_type = require('../services/serviceType.model');

const PersonalAccountCharge = sequelize.define('personal_account_charges', {
  personal_account_charge_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  charge_no: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.STRING,
  },
  service_desc: {
    type: DataTypes.STRING,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
  },
  date_of_charge: {
    type: DataTypes.STRING,
  },
  time_of_charge: {
    type: DataTypes.STRING,
  },
  reference_account_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.INTEGER,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  service_id: {
    type: DataTypes.INTEGER,
  },
  service_type_id: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  percentage_discount: {
    type: DataTypes.INTEGER,
  },
  amount_before_discount: {
    type: DataTypes.INTEGER,
  },
  discount_reason: {
    type: DataTypes.STRING,
  },
  is_copay: {
    type: DataTypes.STRING,
  },
  total_charge_amount: {
    type: DataTypes.INTEGER,
  },
  total_amount_paid: {
    type: DataTypes.INTEGER,
  },
  patient_full_name_pac: {
    type: DataTypes.STRING,
  },
  admission_status: {
    type: DataTypes.STRING,
  },
  patient_id_pac: {
    type: DataTypes.INTEGER,
  },
  seen_by_consultant: {
    type: DataTypes.STRING,
  },
  doctor_name: {
    type: DataTypes.STRING,
  },
  clinic_id: {
    type: DataTypes.STRING,
  },
  clinic_name: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

PersonalAccountCharge.belongsTo(PatientDetails, { foreignKey: 'patient_id_pac', targetKey: 'patient_id' });
PersonalAccountCharge.belongsTo(Appointments2, { foreignKey: 'appointment_id' });
PersonalAccountCharge.belongsTo(Service_type, { foreignKey: 'service_type_id' });

module.exports = PersonalAccountCharge;
