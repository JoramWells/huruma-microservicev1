/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../db/connect');

const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const PatientAccounts = require('../models/patient/patientAccounts.model');
const PatientDetails = require('../models/patient/patientDetails.models');
const Account_type = require('../models/_accounts/accountTypes.model');
const AccountingAccountDetails = require('../models/_accounts/accountingAccountDetails.model');

const addPatientAccount = async (req, res, next) => {
  try {
    const results = await PatientAccounts.create(req.body);
    res.json(results);
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllPatientAccounts = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { account_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await PatientAccounts.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where,
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name'],
        },
        {
          model: Account_type,
          attributes: ['account_type_description'],
        },
        {
          model: AccountingAccountDetails,
          attributes: ['account_name'],
        },
      ],
    });
    res.status(200).json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPatientAccounts = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    PatientAccounts.findOne({
      where: {
        account_type_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const editPatientAccount = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    PatientAccounts.findOne({
      where: {
        id,
      },
    })
      .then((response) => {
        response.service_name = serviceName;
        response.service_category = serviceCategory;
        return response.save();
      })
      .catch((error) => console.error(error));
  });
};

const deleteAccount = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    PatientAccounts.destroy({
      where: {
        admission_id: id,
      },
    }).then((response) => {
      res.sendStatus(200).json(response);
      // console.log(response);
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  addPatientAccount,
  getAllPatientAccounts,
  getPatientAccounts,
  editPatientAccount,
  deleteAccount,
};
