/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../../db/connect');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Patient_details = require('../../models/patient/patients.model');
const Appointments = require('../../models/appointment/appointments2.models');
const Users = require('../../models/user/user.model');
const InpatientNurseVisits = require('../../models/inpatient/inpatientNurseVisits.model');

const addInpatientNurseVisits = async (req, res, next) => {
  try {
    const results = await InpatientNurseVisits.create(req.body);
    res.json(results);
    next();
    console.log('saving InpatientNurseVisits..');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getAllInpatientNurseVisits = async (req, res, next) => {
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
    const { rows, count } = await InpatientNurseVisits.findAndCountAll({
      order: [['date_of_visit', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Patient_details,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
          // where,
        },
        {
          model: Appointments,
          attributes: ['appointment_date'],
        },
        //   {
        //     model: Wards,
        //     attributes: ['ward_description'],
        //   },
        {
          model: Users,
          attributes: ['full_name'],
        },
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

const getInpatientNurseVisitsDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await InpatientNurseVisits.findOne({
      // where: {
      //   inpatient_treatmentChart_id: id,
      // },
      // include: [
      //   {
      //     model: Patient_details,
      //     attributes: ['first_name', 'middle_name', 'patient_gender', 'dob', 'cell_phone'],

      //   },
      //   {
      //     model: InpatientNurseVisits_category,
      //     attributes: ['InpatientNurseVisits_category_description'],
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
      //     model: InpatientNurseVisitsType,
      //     attributes: ['InpatientNurseVisits_type_description'],
      //   },
      //   {
      //     model: InpatientNurseVisitsBedBillingTypes,
      //     attributes: ['bed_billing_type_description'],
      //   },
      //   {
      //     model: InpatientNurseVisitsBedBillingTypes,
      //     attributes: ['bed_billing_type_description'],
      //   },
      // ],
    });
    res.json(InpatientNurseVisits);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getInpatientNurseVisitsDetailByPatientID = async (req, res, next) => {
  const { id } = req.params;

  const {
    page, pageSize, searchQuery, patient_id,
  } = req.query;
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
    const { rows, count } = await InpatientNurseVisits.findAndCountAll({
      // order: [['InpatientNurseVisits_date', 'DESC']],
      where: {
        patient_id,
        admission_id: id,
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

const editInpatientNurseVisitsDetail = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const user = await InpatientNurseVisits.findOne({
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

const deleteInpatientNurseVisits = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await InpatientNurseVisits.destroy({
      where: {
        InpatientNurseVisits_id: id,
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
  addInpatientNurseVisits,
  getAllInpatientNurseVisits,
  getInpatientNurseVisitsDetail,
  editInpatientNurseVisitsDetail,
  deleteInpatientNurseVisits,
  getInpatientNurseVisitsDetailByPatientID,
};
