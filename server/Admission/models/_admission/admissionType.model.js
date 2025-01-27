/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const AdmissionType = sequelize.define('admission_types', {
  admission_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  admission_type_description: {
    type: DataTypes.STRING,
  },
});

module.exports = AdmissionType;
