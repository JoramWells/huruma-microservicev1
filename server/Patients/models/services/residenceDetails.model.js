/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const ResidenceDetails = sequelize.define('residence_details', {
  residence_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  residence_name: {
    type: DataTypes.STRING,
  },
});

// create the pricelists model
// sequelize.sync().then(()=>{
//     console.log('Book table created')
// }).catch(error=>{
//     console.error('Unable to create table :', error)
// })

module.exports = ResidenceDetails;
