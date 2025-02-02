/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const Payroll_employee_benefits_file = require('../models/_payroll/payrollEmployeeBenefitsFile.model');
const Payroll_employee_record = require('../models/_payroll/payrollEmployeeRecords.model.js');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset.js');
const PayrollOtherIncomeAndAllowances = require('../models/_payroll/payrollOtherIncomeAndAllowances.model.js');

// Admissions.belongsTo(Patient_details, { foreignKey: 'patient_id', as: 'patient_details' });
// Admissions.hasMany(Patient_details, { as: 'patients', foreignKey: 'patient_id' });

const addPayrollEmployeeBenefits = async (req, res, next) => {
  try {
    const results = Payroll_employee_benefits_file.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPayrollEmployeeBenefits = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query
  let where = {}

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize)

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await Payroll_employee_benefits_file.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Payroll_employee_record,
          attributes: ['full_name'],
          require: true,
          where
        },
        {
          model: PayrollOtherIncomeAndAllowances,
          attributes: ['other_income_description']
        }
      ],
    });
    res.json({
      data: rows,
      total: count,
      page: page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// 
const getPayrollEmployeeBenefitsByPayrollID = async (req, res, next) => {
  const { page, pageSize, searchQuery, employee_id } = req.query

  let where = {}

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize)

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { id } = req.params;
    const { rows, count } = await Payroll_employee_benefits_file.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where: {
        payroll_id: id,
        employee_id
      },
      include: [
        // {
        //   model: Payroll_employee_record,
        //   attributes: ['full_name'],
        //   require: true,
        //   where
        // },
        {
          model: PayrollOtherIncomeAndAllowances,
          attributes: ['other_income_description']
        }
      ],
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
  }
};

const getPayrollEmployeeEmployeeBenefit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_employee_benefits_file.findOne({
      where: {
        credit_payment_id: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editPayrollEmployeeEmployeeBenefit = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Payroll_employee_benefits_file.findOne({
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

const deletePayrollEmployeeEmployeeBenefit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_employee_benefits_file.destroy({
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
  addPayrollEmployeeBenefits,
  getAllPayrollEmployeeBenefits,
  getPayrollEmployeeEmployeeBenefit,
  editPayrollEmployeeEmployeeBenefit,
  deletePayrollEmployeeEmployeeBenefit,
  getPayrollEmployeeBenefitsByPayrollID
};
