/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../db/connect');
const AccountingDocuments = require('../models/_accounts/accountingDocuments.model');
const AccountingAccountDetails = require('../models/_accounts/accountingAccountDetails.model');
const AccountingDocumentTypes = require('../models/_accounts/accountingDocumentTypes.model');
const AccountingClients = require('../models/_accounts/accountingClients.model');
const AccountingStores = require('../models/_accounts/accountingStore.model');
const Accounting_item = require('../models/_accounts/accountingItems.model');
const AccountingDocumentStatus = require('../models/_accounts/accountingDocumentStatus.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const AccountingDepartment = require('../models/_accounts/accountingDepartment.model');

const addAccountingDocument = async (req, res, next) => {
  try {
    const results = await AccountingDocuments.create(req.body);
    res.json(results);
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllAccountingDocuments = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${searchQuery}%` } },
          { middle_name: { [Op.iLike]: `%${searchQuery}%` } },
          { last_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await AccountingDocuments.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: AccountingAccountDetails,
          attributes: ['account_name'],
        },
        {
          model: AccountingDocumentTypes,
          attributes: ['document_type_description'],
        },
        {
          model: AccountingClients,
          attributes: ['client_name'],

        },
        {
          model: AccountingStores,
          attributes: ['store_description'],
        },
        {
          model: Accounting_item,
          attributes: ['item_description'],
        },
        {
          model: AccountingDocumentStatus,
          attributes: ['document_status_description'],
        },
        {
          model: AccountingDepartment,
          attributes: ['department_name'],
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

const getAccountingDocument = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    AccountingDocuments.findOne({
      where: {
        account_type_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const editAccountingDocument = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    AccountingDocuments.findOne({
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

const deleteAccountingDocument = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    AccountingDocuments.destroy({
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
  addAccountingDocument,
  getAllAccountingDocuments,
  getAccountingDocument,
  editAccountingDocument,
  deleteAccountingDocument,
};
