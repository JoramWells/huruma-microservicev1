/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Payroll_tax_categories = require("../models/_payroll/payrollTaxCategories.model");



const addPayrollTaxCategories = async (req, res, next) => {
  try {
    const results = Payroll_tax_categories.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPayrollTaxCategory = async (req, res, next) => {
  try {
    const results = await Payroll_tax_categories.findAll({});
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getPayrollTaxCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_tax_categories.findOne({
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

const editPayrollTaxCategory = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Payroll_tax_categories.findOne({
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

const deletePayrollTaxCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Payroll_tax_categories.destroy({
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
  addPayrollTaxCategories,
  getAllPayrollTaxCategory,
  getPayrollTaxCategory,
  editPayrollTaxCategory,
  deletePayrollTaxCategory,
};
