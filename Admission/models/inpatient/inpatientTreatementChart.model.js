/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient_details = require('../patient/patients.model');
const Appointments = require('../appointment/appointments2.models');
const Users = require('../user/user.model');

const InpatientTreatmentChart = sequelize.define('inpatient_treatment_chart', {
  inpatient_treatment_chart: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  appointment_id: {
    type: DataTypes.STRING,
  },
  admission_id: {
    type: DataTypes.STRING,
  },
  patient_id: {
    type: DataTypes.STRING,
  },
  drug: {
    type: DataTypes.STRING,
  },
  dose: {
    type: DataTypes.STRING,
  },
  route: {
    type: DataTypes.STRING,
  },
  frq: {
    type: DataTypes.STRING,
  },
  extra_details: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.STRING,
  },
  date_of_treatment: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.STRING,
  },
  nurse_id: {
    type: DataTypes.STRING,
  },
  time_of_treatment: {
    type: DataTypes.STRING,
  },
});

InpatientTreatmentChart.belongsTo(Patient_details, { foreignKey: 'patient_id' });
InpatientTreatmentChart.belongsTo(Appointments, { foreignKey: 'appointment_id' });
InpatientTreatmentChart.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = InpatientTreatmentChart;
