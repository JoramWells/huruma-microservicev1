/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Appointments2 = require('../_appointment/appointments2.models');

const VitalSigns = sequelize.define('patient_details', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  appointment_id: {
    type: DataTypes.UUID,
  },
  patient: {
    type: DataTypes.UUID,
  },
  temperature: {
    type: DataTypes.INTEGER,
  },
  pulseRate: {
    type: DataTypes.INTEGER,
  },
  respiratoryRate: {
    type: DataTypes.INTEGER,
  },
  systolic: {
    type: DataTypes.INTEGER,
  },
  diastolic: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  height: {
    type: DataTypes.INTEGER,
  },
  bmi: {
    type: DataTypes.INTEGER,
  },
  sp02: {
    type: DataTypes.INTEGER,
  },

});

VitalSigns.belongsTo(Appointments2, { foreignKey: 'appointment_id' });

// sequelize.query('ALTER TABLE Patient_details ALTER COLUMN patient_id TYPE VARCHAR(255);')
//   .then(() => {
//     console.log('Column data type modified successfully.');
//   })
//   .catch((error) => {
//     console.error('Error modifying column data type:', error);
//   });
module.exports = VitalSigns;
