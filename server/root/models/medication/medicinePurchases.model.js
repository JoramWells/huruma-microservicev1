/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const Medication = require('./medication.model');
const Users = require('../user.model');
const Hospital_store = require('../hospitalStores.model');
const Medication_purchase_type = require('./medicationPurchaseType.model');
const Suppliers = require('../suppliers.model');

const Medicine_purchase = sequelize.define('medicine_purchases', {
  purchase_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  supplier_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'suppliers',
      key: 'supplier_id',
    },
    onDelete: 'CASCADE',
  },
  medication_id: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  date_of_receipt: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  receipt_no: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  batch_no: {
    type: DataTypes.STRING,
  },
  real_quantity: {
    type: DataTypes.STRING,
  },
  medication_purchase_type_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'medication_purchase_types',
      key: 'medication_purchase_type_id',
    },
    onDelete: 'CASCADE',
  },
  hospital_id: {
    type: DataTypes.INTEGER,
  },
  percentage_discount: {
    type: DataTypes.INTEGER,
  },
  hospital_store_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'hospital_stores',
      key: 'hospital_store_id',
    },
    onDelete: 'CASCADE',
  },
  expiry_date: {
    type: DataTypes.STRING,
  },
  tax_percentage: {
    type: DataTypes.INTEGER,
  },
  bonus: {
    type: DataTypes.INTEGER,
  },
  serial: {
    type: DataTypes.STRING,
  },
  real_bonus: {
    type: DataTypes.INTEGER,
  },
  purchase_order_number: {
    type: DataTypes.STRING,
  },
});

// create the pricelists model
// sequelize.sync().then(()=>{
//     console.log('Book table created')
// }).catch(error=>{
//     console.error('Unable to create table :', error)
// })

Medicine_purchase.belongsTo(Medication, { foreignKey: 'medication_id' });
Medicine_purchase.belongsTo(Users, { foreignKey: 'user_id' });
Medicine_purchase.belongsTo(Hospital_store, { foreignKey: 'hospital_store_id' });
Medicine_purchase.belongsTo(Medication_purchase_type, { foreignKey: 'medication_purchase_type_id' });
Medicine_purchase.belongsTo(Suppliers, { foreignKey: 'supplier_id' });

module.exports = Medicine_purchase;
