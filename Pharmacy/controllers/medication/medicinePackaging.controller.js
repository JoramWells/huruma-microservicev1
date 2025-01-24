/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addMedicinePackaging = async (req, res, next) => {
  try {
    const result = Medication_packaging_type.create(req.body);
    res.status(201).json(result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMedicinePackaging = async (req, res, next) => {
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

    const { rows, count } = await Medication_packaging_type.findAndCountAll({
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
    console.log(error)

    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getMedicinePackagingDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Medication_packaging_type.findOne({
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

const editMedicinePackaging = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Medication_packaging_type.findOne({
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

const deleteMedicinePackaging = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Medication_packaging_type.destroy({
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
  addMedicinePackaging,
  getAllMedicinePackaging,
  getMedicinePackagingDetail,
  editMedicinePackaging,
  deleteMedicinePackaging,
};
