/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { Op } = require('sequelize');
const AccountingAccountDetails = require('../../models/_accounts/accountingAccountDetails.model');
const ConsultationGroupsWithCreditAccount = require('../../models/consultation/consultationGroupWithCreditAccount.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addConsultationGroupWithCreditAccounts = async (req, res, next) => {
  try {
    const results = ConsultationGroupsWithCreditAccount.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllConsultationGroupWithCreditAccounts = async (req, res, next) => {
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

    const { rows, count } = await ConsultationGroupsWithCreditAccount.findAndCountAll({
      // order: [['appointment_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      include: [
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
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getConsultationGroupWithCreditAccounts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await ConsultationGroupsWithCreditAccount.findOne({
      where: {
        admission_id: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editConsultationGroupWithCreditAccounts = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await ConsultationGroupsWithCreditAccount.findOne({
      where: {
        id,
      },
    });
    results.firstName = firstName;
    return results.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteConsultationGroupWithCreditAccounts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await ConsultationGroupsWithCreditAccount.destroy({
      where: {
        admission_id: id,
      },
    });
    if (results) {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addConsultationGroupWithCreditAccounts,
  getAllConsultationGroupWithCreditAccounts,
  getConsultationGroupWithCreditAccounts,
  editConsultationGroupWithCreditAccounts,
  deleteConsultationGroupWithCreditAccounts,
};
