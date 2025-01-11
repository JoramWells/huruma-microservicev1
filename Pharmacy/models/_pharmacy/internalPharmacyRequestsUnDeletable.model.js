/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
// const Patient_details = require('../patient/patients.models');
const Procedure_detail = require('../procedure/procedureDetails.model');
const Medication = require('../medication/medication.model');
const Patient = require('../patient/patient2.models');
// const Appointments2 = require('../appointment/appointments2.models');

const InternalPharmacyRequestsUndeletable = sequelize.define('internal_pharmacy_requests_undeletable', {
  // pharmacy_requests_deletion_id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   // defaultValue: UUIDV4,
  // },
  pharmacy_request_id: {
    type: DataTypes.INTEGER,
    // primaryKey: true,
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
  delivery_status: {
    type: DataTypes.INTEGER,
  },
  cost: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  pay_status: {
    type: DataTypes.INTEGER,
  },

  prescription_term: {
    type: DataTypes.STRING,
  },

});

// sequelize.sync().then(() => {
//   console.log('Book table created');
// }).catch((error) => {
//   console.error('Unable to create table :', error);
// });

InternalPharmacyRequestsUndeletable.belongsTo(Patient, { foreignKey: 'patient_id' });
// Internal_pharmacy_request2.belongsTo(Appointments2, { foreignKey: 'appointment_id' });
InternalPharmacyRequestsUndeletable.belongsTo(Medication, { foreignKey: 'medication_id' });

module.exports = InternalPharmacyRequestsUndeletable;
