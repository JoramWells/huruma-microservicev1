/* eslint-disable indent */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const DoctorNotes = require('../doctor/doctorNotes.model');
const Appointments = require('./appointments.model');
// const Patient_details = require('../patient/patients.models');
// const Account_type = require('../accountTypes.model');

const AppointmentDiagnoses = sequelize.define('appointment_diagnoses', {
    appointment_diagnosis_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    appointment_id: {
        type: DataTypes.INTEGER,
    },
    diagnosis_id: {
        type: DataTypes.INTEGER,
    },
    diagnosis_for: {
        type: DataTypes.STRING,
    },

}, { timestamps: false });

AppointmentDiagnoses.belongsTo(Appointments, { foreignKey: 'appointment_id' });
// Appointments.belongsTo(Account_type, { foreignKey: 'account_type_id' });
AppointmentDiagnoses.belongsTo(DoctorNotes, { foreignKey: 'diagnosis_id', targetKey: 'note_id' });

// sequelize.sync().then(() => {
//   console.log('Book table created');
// }).catch((error) => {
//   console.error('Unable to create table :', error);
// });

module.exports = AppointmentDiagnoses;
