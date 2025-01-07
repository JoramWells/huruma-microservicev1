/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const Medication_category = require('../../models/medication/medicationCategory.models');
const Medication_packaging_type = require('../../models/medication/medicationPackaging.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addMedicationCategory = async (req, res, next) => {
  try {
    const result = Medication_category.create(req.body);
    res.status(201).json(result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMedicationCategories = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query
  let where = {}

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize)

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { category_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }

    const { rows, count } = await Medication_category.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where
    });
    res.json({
      data: rows,
      total: count,
      page: page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getMedicationCategoryDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Medication_category.findOne({
      where: {
        result_id: id,
      },
    });
    res.json(result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editMedicationCategory = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Medication_category.findOne({
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

const deleteMedicationCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Medication_category.destroy({
      where: {
        result_id: id,
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
  addMedicationCategory,
  getAllMedicationCategories,
  getMedicationCategoryDetail,
  editMedicationCategory,
  deleteMedicationCategory,
};
