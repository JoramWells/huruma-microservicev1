/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */


const Payroll_employee_loan_record = require('../models/_payroll/payrollEmployeeLoanRecord.model.js');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

// Admissions.belongsTo(Patient_details, { foreignKey: 'patient_id', as: 'patient_details' });
// Admissions.hasMany(Patient_details, { as: 'patients', foreignKey: 'patient_id' });

const addPayrollEmployeeLoanRecords = async (req, res, next) => {
  try {
    const results = Payroll_employee_loan_record.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPayrollEmployeeLoanRecords = async (req, res, next) => {
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

    const { rows, count } = await Payroll_employee_loan_record.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      // include: [
      //   {
      //     model: Payroll_employee_category,
      //     attributes: ['employee_category_description'],
      //     where,

      //   },
      //   {
      //     model: Payroll_deduction,
      //     attributes: ['deduction_description']
      //   }
      // ]
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

const getPayrollEmployeeLoanRecords = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_employee_loan_record.findOne({
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

const editPayrollEmployeeLoanRecords = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Payroll_employee_loan_record.findOne({
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

const deletePayrollEmployeeLoanRecords = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_employee_loan_record.destroy({
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
  addPayrollEmployeeLoanRecords,
  getAllPayrollEmployeeLoanRecords,
  getPayrollEmployeeLoanRecords,
  editPayrollEmployeeLoanRecords,
  deletePayrollEmployeeLoanRecords,
};
