/* eslint-disable indent */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const ReferralTypes = sequelize.define('referral_types', {
    referral_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    referral_type_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

module.exports = ReferralTypes;
