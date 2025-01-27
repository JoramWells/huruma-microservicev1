/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient_details = require('../patient/patients.model');
const Appointments = require('../appointment/appointments2.models');
const Users = require('../user/user.model');

const InpatientPhysiotherapistVisits = sequelize.define('inpatient_physiotherapist_visits', {
  inpatient_physiotherapist_visit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
  },
  admission_id: {
    type: DataTypes.INTEGER,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  physiotherapist_id: {
    type: DataTypes.INTEGER,
  },
  date_of_visit: {
    type: DataTypes.STRING,
  },
  time_of_visit: {
    type: DataTypes.STRING,
  },
  cost_of_visit: {
    type: DataTypes.STRING,
  },
  physiotherapist_notes: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.STRING,
  },
  payment_status: {
    type: DataTypes.STRING,
  },
});

InpatientPhysiotherapistVisits.belongsTo(Patient_details, { foreignKey: 'patient_id' });
InpatientPhysiotherapistVisits.belongsTo(Appointments, { foreignKey: 'appointment_id' });
// InpatientPhysiotherapistVisits.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = InpatientPhysiotherapistVisits;
