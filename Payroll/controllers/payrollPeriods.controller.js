/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

// const Payroll_deduction = require('../models/_payroll/payrollDeductions.model');
// const Payroll_periods = require('../models/_payroll/payrollPeriods.model');
// const Payroll_employee_record = require('../models/_payroll/payrollEmployeeRecords.model');
const { Op } = require('sequelize');
const Payroll_employee_category = require('../models/_payroll/payrollEmployeeCategory.model');
const Payroll_periods = require('../models/_payroll/payrollPeriods.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

// Admissions.belongsTo(Patient_details, { foreignKey: 'patient_id', as: 'patient_details' });
// Admissions.hasMany(Patient_details, { as: 'patients', foreignKey: 'patient_id' });

const addPayrollPeriod = async (req, res, next) => {
  try {
    const results = Payroll_periods.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPayrollPeriods = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query

  let where = {}

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize)

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { payroll_description: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }

    const { rows, count } = await Payroll_periods.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where,
      include: [
        {
          model: Payroll_employee_category,
          attributes: ['employee_category_description'],

        },
        //   {
        //     model: Payroll_deduction,
        //     attributes: ['deduction_description']
        //   }
      ]
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

const getPayrollPeriod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_periods.findOne({
      where: {
        payroll_id: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editPayrollPeriod = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Payroll_periods.findOne({
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

const deletePayrollPeriod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_periods.destroy({
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
  addPayrollPeriod,
  getAllPayrollPeriods,
  getPayrollPeriod,
  editPayrollPeriod,
  deletePayrollPeriod,
};
