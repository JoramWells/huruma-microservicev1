/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const InpatientTreatmentChart = sequelize.define('inpatient_treatment_charts', {
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

// create the pricelists model
// sequelize.sync().then(()=>{
//     console.log('Book table created')
// }).catch(error=>{
//     console.error('Unable to create table :', error)
// })

module.exports = InpatientTreatmentChart;
