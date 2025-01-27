/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../../db/connect');
const InvoicePayments = require('../../models/invoice/invoicePayments.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Users = require('../../models/user/user.model');
const ServiceType = require('../../models/_accounts/serviceTypes.model');
const CashPaymentModes = require('../../models/_accounts/cashPaymentModes.model');

const addInvoicePaymentDetail = async (req, res, next) => {
  try {
    const results = await InvoicePayments.create(req.body);
    res.json(results);
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllInvoicePayments = async (req, res, next) => {
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
    const { rows, count } = await InvoicePayments.findAndCountAll({
      order: [['date_of_payment', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      where,
      include: [
        {
          model: Users,
          attributes: ['full_name'],
        },
        {
          model: ServiceType,
          attributes: ['service_type_description'],
        },
        {
          model: CashPaymentModes,
          attributes: ['cash_payment_mode_description'],
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

const getInvoicePaymentDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    InvoicePayments.findOne({
      where: {
        account_type_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const editInvoicePaymentDetail = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    InvoicePayments.findOne({
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

const deleteInvoicePaymentDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    InvoicePayments.destroy({
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
  addInvoicePaymentDetail,
  getAllInvoicePayments,
  getInvoicePaymentDetail,
  editInvoicePaymentDetail,
  deleteInvoicePaymentDetail,
};
