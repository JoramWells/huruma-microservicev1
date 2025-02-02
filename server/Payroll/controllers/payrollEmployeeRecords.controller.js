/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const Payroll_employee_record = require('../models/_payroll/payrollEmployeeRecords.model');
const Payroll_job_title = require('../models/_payroll/payrollJobTitles.model');
const AccountingDepartment = require('../models/accounts/accountingDepartment.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

// Admissions.belongsTo(Patient_details, { foreignKey: 'patient_id', as: 'patient_details' });
// Admissions.hasMany(Patient_details, { as: 'patients', foreignKey: 'patient_id' });

const addPayrollEmployeeRecord = async (req, res, next) => {
  try {
    const results = Payroll_employee_record.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPayrollEmployeeRecords = async (req, res, next) => {
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
    const { rows, count } = await Payroll_employee_record.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where
      // include: [
      //   {
      //     model: Payroll_job_title,
      //     attributes: ['job_title_description'],
      //   },
      //   {
      //     model:AccountingDepartment,
      //     attributes:['department_name']
      //   }
      // ],
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

const getPayrollEmployeeRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_employee_record.findOne({
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

const editPayrollEmployeeRecord = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Payroll_employee_record.findOne({
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

const deletePayrollEmployeeRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_employee_record.destroy({
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
  addPayrollEmployeeRecord,
  getAllPayrollEmployeeRecords,
  getPayrollEmployeeRecord,
  editPayrollEmployeeRecord,
  deletePayrollEmployeeRecord,
};
