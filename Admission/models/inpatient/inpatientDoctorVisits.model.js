/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient_details = require('../patient/patients.model');
const Appointments = require('../appointment/appointments2.models');
const Users = require('../user/user.model');
const Admissions2 = require('../_admission/admission2.model');

const InpatientDoctorVisits = sequelize.define('inpatient_doctor_visits', {
  inpatient_doctor_visit_id: {
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
  doctor_id: {
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
  doctor_notes: {
    type: DataTypes.STRING,
  },
});

InpatientDoctorVisits.belongsTo(Patient_details, { foreignKey: 'patient_id' });
InpatientDoctorVisits.belongsTo(Admissions2, { foreignKey: 'admission_id' });
InpatientDoctorVisits.belongsTo(Appointments, { foreignKey: 'appointment_id' });
InpatientDoctorVisits.belongsTo(Users, { foreignKey: 'doctor_id', targetKey: 'user_id' });

// InpatientDoctorVisits.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = InpatientDoctorVisits;
