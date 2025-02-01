/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const PeopleRelations = sequelize.define('people_relations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    // defaultValue: UUIDV4,
  },
  description: {
    type: DataTypes.STRING,
  },

});

// sequelize.query('ALTER TABLE Patient_details ALTER COLUMN patient_id TYPE VARCHAR(255);')
//   .then(() => {
//     console.log('Column data type modified successfully.');
//   })
//   .catch((error) => {
//     console.error('Error modifying column data type:', error);
//   });
module.exports = PeopleRelations;
