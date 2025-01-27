/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const PatientDetails = require('../patientDetails.models');
const Appointments2 = require('../appointment/appointments.model');
const Users = require('../user/user.model');

const PersonalChargesPayment = sequelize.define('personal_charges_payments', {
  charge_payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  charge_no: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.STRING,
  },
  date_of_payment: {
    type: DataTypes.STRING,
  },
  time_of_payment: {
    type: DataTypes.STRING,
  },
  // reference_account_id: {
  //   type: DataTypes.INTEGER,
  // },
  // status: {
  //   type: DataTypes.INTEGER,
  // },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  service_id: {
    type: DataTypes.INTEGER,
  },
  service_type_id: {
    type: DataTypes.INTEGER,
  },
  receipt_no: {
    type: DataTypes.STRING,
  },
  service_desc: {
    type: DataTypes.STRING,
  },
  cash_payment_mode_id: {
    type: DataTypes.INTEGER,
  },
  reference: {
    type: DataTypes.STRING,
  },
  bank_account_id: {
    type: DataTypes.INTEGER,
  },
  transaction_charges_percentage: {
    type: DataTypes.INTEGER,
  },
  transaction_charges_amount: {
    type: DataTypes.INTEGER,
  },
  patient_id_personal_charge_payments: {
    type: DataTypes.INTEGER,
  },
  cleared: {
    type: DataTypes.STRING,
  },
  cleared_by: {
    type: DataTypes.INTEGER,
  },
  admission_status: {
    type: DataTypes.STRING,
  },
  is_copay_personal_charge_payments: {
    type: DataTypes.STRING,
  },
  appointment_id_personal_charge_payments: {
    type: DataTypes.INTEGER,
  },
  patient_full_name_pcp: {
    type: DataTypes.STRING,
  },
  seen_by_consultant: {
    type: DataTypes.STRING,
  },
  doctor_name: {
    type: DataTypes.STRING,
  },
  account_id: {
    type: DataTypes.INTEGER,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
  },
  clinic_name: {
    type: DataTypes.STRING,
  },
  date_of_application_to_inpatient_bill: {
    type: DataTypes.INTEGER,
  },
  linked_insurance_id: {
    type: DataTypes.INTEGER,
  },
  unit_cost_of_sale: {
    type: DataTypes.INTEGER,
  },
  quantity_cost_of_sale: {
    type: DataTypes.INTEGER,
  },
  cost_of_sale_account_id: {
    type: DataTypes.INTEGER,
  },
  stock_account_id: {
    type: DataTypes.INTEGER,
  },
  user_shift_id: {
    type: DataTypes.INTEGER,
  },
  account_group_id: {
    type: DataTypes.INTEGER,
  },
  refund_bank_account_id: {
    type: DataTypes.INTEGER,
  },
  refund_reference_number: {
    type: DataTypes.INTEGER,
  },
  refund_amount: {
    type: DataTypes.INTEGER,
  },
  date_of_refund: {
    type: DataTypes.STRING,
  },
  refund_payment_mode_id: {
    type: DataTypes.INTEGER,
  },
}, { timestamps: false });

PersonalChargesPayment.belongsTo(PatientDetails, { foreignKey: 'patient_id_personal_charge_payments', targetKey: 'patient_id' })
PersonalChargesPayment.belongsTo(Appointments2, { foreignKey: 'appointment_id_personal_charge_payments', targetKey: 'appointment_id' })
PersonalChargesPayment.belongsTo(Users, { foreignKey: 'user_id' })

module.exports = PersonalChargesPayment;
