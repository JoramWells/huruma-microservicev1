/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient_details = require('../patient/patients.model');
const Appointments = require('../appointment/appointments2.models');
const Users = require('../user/user.model');

const InpatientNurseVisits = sequelize.define('inpatient_nurse_visits', {
  inpatient_nurse_visit_id: {
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
  nurse_id: {
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
  nurse_notes: {
    type: DataTypes.STRING,
  },
});

InpatientNurseVisits.belongsTo(Patient_details, { foreignKey: 'patient_id' });
InpatientNurseVisits.belongsTo(Appointments, { foreignKey: 'appointment_id' });
// InpatientNurseVisits.belongsTo(Users, { foreignKey: 'user_id' });
InpatientNurseVisits.belongsTo(Users, { foreignKey: 'nurse_id', targetKey: 'user_id' });

module.exports = InpatientNurseVisits;
