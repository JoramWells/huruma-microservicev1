/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Payroll_tax_status = require("../models/_payroll/payrollTaxStatus.model");


const addPayrollTaxStatus = async (req, res, next) => {
  try {
    const results = Payroll_tax_status.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPayrollTaxStatus = async (req, res, next) => {
  try {
    const results = await Payroll_tax_status.findAll({});
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getPayrollTaxStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_tax_status.findOne({
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

const editPayrollTaxStatus = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Payroll_tax_status.findOne({
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

const deletePayrollTaxStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_tax_status.destroy({
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
  addPayrollTaxStatus,
  getAllPayrollTaxStatus,
  getPayrollTaxStatus,
  editPayrollTaxStatus,
  deletePayrollTaxStatus,
};
