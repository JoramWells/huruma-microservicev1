/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../db/connect');
const AccountingAccountDetails = require('../models/_accounts/accountingAccountDetails.model');
const AccountingGroups = require('../models/_accounts/accountingGroup.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

const addAccountingAccountDetail = async (req, res, next) => {
  try {
    const results = await AccountingAccountDetails.create(req.body);
    res.json(results);
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllAccountingAccountDetails = async (req, res, next) => {
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
    const { rows, count } = await AccountingAccountDetails.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where,
      include: [
        {
          model: AccountingGroups,
          attributes: ['account_group_description'],
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

const getAccountingAccountDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    AccountingAccountDetails.findOne({
      where: {
        account_type_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const editAccountingAccountDetail = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    AccountingAccountDetails.findOne({
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

const deleteAccountingAccountDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    AccountingAccountDetails.destroy({
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
  addAccountingAccountDetail,
  getAllAccountingAccountDetails,
  getAccountingAccountDetail,
  editAccountingAccountDetail,
  deleteAccountingAccountDetail,
};
