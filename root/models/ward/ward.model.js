const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const Wards = sequelize.define('wards', {
  ward_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true,
  },
  wardType: {
    type: DataTypes.STRING,
  },
  ward_description: {
    type: DataTypes.STRING,
  },
  admissionChargeNonCorporate: {
    type: DataTypes.STRING,
  },
  admissionChargeCorporate: {
    type: DataTypes.STRING,
  },
  dailyRateNonCorporate: {
    type: DataTypes.STRING,
  },
  nursingDailyChargeNonCorporate: {
    type: DataTypes.STRING,
  },
  nursingDailyChargeCorporate: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

// create the pricelists model
// sequelize.sync().then(() => {
//   console.log('Ward table created');
// }).catch((error) => {
//   console.error('Unable to create table :', error);
// });

module.exports = Wards;
