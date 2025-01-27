/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { Op } = require('sequelize');

const ConsultationType = require('../../models/consultation/consultationType.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addConsultationType = async (req, res, next) => {
  try {
    const results = ConsultationType.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllConsultationTypes = async (req, res, next) => {
  const { id } = req.params;
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
    const { rows, count } = await ConsultationType.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
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

const getConsultationType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await ConsultationType.findOne({
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

const editConsultationTYpe = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await ConsultationType.findOne({
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

const deleteConsultationType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await ConsultationType.destroy({
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
  addConsultationType,
  getAllConsultationTypes,
  getConsultationType,
  editConsultationTYpe,
  deleteConsultationType,
};
