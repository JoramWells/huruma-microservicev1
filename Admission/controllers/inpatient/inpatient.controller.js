/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../../db/connect');
const InpatientTreatmentChart = require('../../models/inpatient/inpatientTreatementChart.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Patient_details = require('../../models/patient/patients.model');

const addInpatientTreatmentChart = async (req, res, next) => {
  try {
    const results = await InpatientTreatmentChart.create(req.body);
    res.json(results);
    next();
    console.log('saving InpatientTreatmentChart..');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getAllInpatientTreatmentChart = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

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
    const { rows, count } = await InpatientTreatmentChart.findAndCountAll({
      // order: [['InpatientTreatmentChart_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Patient_details,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
          where,
        },
        //   {
        //     model: WardBed,
        //     attributes: ['bed_number'],
        //   },
        //   {
        //     model: Wards,
        //     attributes: ['ward_description'],
        //   },
        //   {
        //     model: Users,
        //     attributes: ['full_name'],
        //   },
      ],
    });
    res.json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getInpatientTreatmentChartDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await InpatientTreatmentChart.findOne({
      // where: {
      //   inpatient_treatmentChart_id: id,
      // },
      // include: [
      //   {
      //     model: Patient_details,
      //     attributes: ['first_name', 'middle_name', 'patient_gender', 'dob', 'cell_phone'],

      //   },
      //   {
      //     model: InpatientTreatmentChart_category,
      //     attributes: ['InpatientTreatmentChart_category_description'],
      //   },
      //   {
      //     model: Inpatient_case_types,
      //     attributes: ['inpatient_case_type_description'],
      //   },
      //   {
      //     model: WardBed,
      //     attributes: ['bed_number'],
      //   },
      //   {
      //     model: Wards,
      //     attributes: ['ward_description'],
      //   },
      //   {
      //     model: Users,
      //     attributes: ['full_name'],
      //   },
      //   {
      //     model: InpatientTreatmentChartType,
      //     attributes: ['InpatientTreatmentChart_type_description'],
      //   },
      //   {
      //     model: InpatientTreatmentChartBedBillingTypes,
      //     attributes: ['bed_billing_type_description'],
      //   },
      //   {
      //     model: InpatientTreatmentChartBedBillingTypes,
      //     attributes: ['bed_billing_type_description'],
      //   },
      // ],
    });
    res.json(InpatientTreatmentChart);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getInpatientTreatmentChartDetailByPatientID = async (req, res, next) => {
  const { id } = req.params;

  const { page, pageSize, searchQuery } = req.query;
  let where = {};

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
    const { rows, count } = await InpatientTreatmentChart.findAndCountAll({
      // order: [['InpatientTreatmentChart_date', 'DESC']],
      where: {
        patient_id: id,
      },
      page,
      pageSize,
      limit,
      offset,
      // include: [
      //   {
      //     model: Patient_details,
      //     attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
      //     where,
      //   },
      //   {
      //     model: WardBed,
      //     attributes: ['bed_number'],
      //   },
      //   {
      //     model: Wards,
      //     attributes: ['ward_description'],
      //   },
      // ],
    });
    res.json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const editInpatientTreatmentChartDetail = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const user = await InpatientTreatmentChart.findOne({
      where: {
        id,
      },
    });
    user.firstName = firstName;
    return user.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteInpatientTreatmentChart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await InpatientTreatmentChart.destroy({
      where: {
        InpatientTreatmentChart_id: id,
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
  addInpatientTreatmentChart,
  getAllInpatientTreatmentChart,
  getInpatientTreatmentChartDetail,
  editInpatientTreatmentChartDetail,
  deleteInpatientTreatmentChart,
  getInpatientTreatmentChartDetailByPatientID,
};
