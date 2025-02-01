/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { Op } = require('sequelize');
const Company_detail = require('../../models/insurance/companyDetails.models');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

// Company_detail.belongsTo(Patient_details, { foreignKey: 'patient_id', as: 'patient_details' });
// Company_detail.hasMany(Patient_details, { as: 'patients', foreignKey: 'patient_id' });

const addCompany = async (req, res, next) => {
  try {
    const results = Company_detail.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllCompanies = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query
  let where = {}

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize)

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { company_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await Company_detail.findAndCountAll({
      order: [['company_name', 'ASC']],
      page,
      pageSize,
      limit,
      offset,
      where,
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

const getCompanyDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Company_detail.findOne({
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

const editCompany = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Company_detail.findOne({
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

const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Company_detail.destroy({
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
  addCompany,
  getAllCompanies,
  getCompanyDetail,
  editCompany,
  deleteCompany,
};
