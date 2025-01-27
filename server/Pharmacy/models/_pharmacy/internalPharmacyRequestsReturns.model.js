/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
// const Patient_details = require('../patient/patients.models');
const Procedure_detail = require('../procedure/procedureDetails.model');
const Medication = require('../medication/medication.model');
const Patient = require('../patient/patient2.models');
// const Appointments2 = require('../appointment/appointments2.models');

const InternalPharmacyRequestsReturns = sequelize.define('internal_pharmacy_requests_returns', {
  medication_return_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
  },
  appointment_id: {
    type: DataTypes.UUID,
  },
  patient_id: {
    type: DataTypes.UUID,
  },
  doctor_id: {
    type: DataTypes.INTEGER,
  },
  medication_id: {
    type: DataTypes.INTEGER,
  },
  pharmacy_request_id: {
    type: DataTypes.INTEGER,
  },
  cost: {
    type: DataTypes.INTEGER,
  },
  quantity_returned: {
    type: DataTypes.INTEGER,
  },
  hospital_store_id: {
    type: DataTypes.INTEGER,
  },

  date_of_return: {
    type: DataTypes.STRING,
  },
  time_of_return: {
    type: DataTypes.STRING,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },

  user_id: {
    type: DataTypes.INTEGER,
  }

});

// sequelize.sync().then(() => {
//   console.log('Book table created');
// }).catch((error) => {
//   console.error('Unable to create table :', error);
// });

InternalPharmacyRequestsReturns.belongsTo(Patient, { foreignKey: 'patient_id' });
// InternalPharmacyRequestsReturns.belongsTo(Appointments2, { foreignKey: 'appointment_id' });
InternalPharmacyRequestsReturns.belongsTo(Medication, { foreignKey: 'medication_id' });

module.exports = InternalPharmacyRequestsReturns;
