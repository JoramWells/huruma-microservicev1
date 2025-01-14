/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../db/connect');
const CashPaymentModes = require('../models/_accounts/cashPaymentModes.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

const addCashPaymentModes = async (req, res, next) => {
  try {
    const results = await CashPaymentModes.create(req.body);
    res.json(results);
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllCashPaymentModes = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { department_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await CashPaymentModes.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      // include: [
      //   {
      //     model: HospitalStores,
      //     attributes: ['hospital_store_description'],
      //   },
      // ],
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

const getCashPaymentModesDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    CashPaymentModes.findOne({
      where: {
        account_type_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const editCashPaymentModes = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    CashPaymentModes.findOne({
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

const deleteCashPaymentModes = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    CashPaymentModes.destroy({
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
  addCashPaymentModes,
  getAllCashPaymentModes,
  getCashPaymentModesDetail,
  editCashPaymentModes,
  deleteCashPaymentModes,
};
