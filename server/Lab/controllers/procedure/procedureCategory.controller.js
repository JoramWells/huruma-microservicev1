/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { DataTypes, Sequelize, Op } = require('sequelize');

const ProcedureCategory = require('../../models/_procedure/procedureCategory.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addProcedureCategory = async (req, res, next) => {
  // create user
  try {
    const procedure = await ProcedureCategory.create(req.body);
    res.status(201).json(procedure);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProcedureCategories = async (req, res, next) => {
  const { page, pageSize, searchQuery, serviceType } = req.query;
  let where = {};
  let serviceTypeWhere = {};

  if (serviceType?.length > 0) {
    serviceTypeWhere = {
      ...serviceTypeWhere,
      service_type_description: serviceType
    }
  }

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
    const { rows, count } = await ProcedureCategory.findAndCountAll({
      order: [['category_name', 'ASC']],
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
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const searchProcedureCategory = async (req, res, next) => {
  const { searchQuery } = req.query;
  let where = {};

  try {
    // const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { procedure_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const results = await ProcedureCategory.findAll({
      // page,
      // pageSize,
      // limit,
      // offset,
      where
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ error: 'Internal Server error' });
    next(error);
  }
};

const getProcedureCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const procedure = await ProcedureCategory.findOne({
      where: {
        procedure_id: id,
      },
    });
    res.json(procedure);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const editProcedureCategory = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const procedure = await ProcedureCategory.findOne({
      where: {
        id,
      },
    });
    procedure.firstName = firstName;
    return procedure.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProcedureCategory = async (req, res, next) => {
  const procedureId = req.params.id;

  try {
    const results = await ProcedureCategory.destroy({
      where: {
        id: procedureId,
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
  addProcedureCategory,
  getAllProcedureCategories,
  getProcedureCategoryById,
  editProcedureCategory,
  deleteProcedureCategory,
  searchProcedureCategory
};
