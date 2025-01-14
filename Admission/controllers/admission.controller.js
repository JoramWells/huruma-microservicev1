/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../db/connect');
const Inpatient_case_types = require(
  '../models/inpatient/inpatientCaseTypes.model',
);
const Admissions2 = require('../models/_admission/admission2.model');
const WardBed = require('../models/ward/wardBed.model');
const Admission_category = require('../models/_admission/admissionCategory');
const Wards = require('../models/ward/ward.model');
const Patient_details = require('../models/patient/patients.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const Users = require('../models/user/user.model');
const AdmissionType = require('../models/_admission/admissionType.model');
const AdmissionBedBillingTypes = require('../models/_admission/admissionBedBillingTypes.model');

const addAdmission = async (req, res, next) => {
  try {
    const admission = await Admissions2.create(req.body);
    res.json(admission);
    next();
    console.log('saving admission..');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getAllAdmission = async (req, res, next) => {
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
    const { rows, count } = await Admissions2.findAndCountAll({
      order: [['admission_date', 'DESC']],
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
        {
          model: WardBed,
          attributes: ['bed_number'],
        },
        {
          model: Wards,
          attributes: ['ward_description'],
        },
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

const getAdmissionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admission = await Admissions2.findOne({
      where: {
        admission_id: id,
      },
      include: [
        {
          model: Patient_details,
          attributes: ['first_name', 'middle_name', 'patient_gender', 'dob', 'cell_phone'],

        },
        {
          model: Admission_category,
          attributes: ['admission_category_description'],
        },
        {
          model: Inpatient_case_types,
          attributes: ['inpatient_case_type_description'],
        },
        {
          model: WardBed,
          attributes: ['bed_number'],
        },
        {
          model: Wards,
          attributes: ['ward_description'],
        },
        {
          model: Users,
          attributes: ['full_name'],
        },
        {
          model: AdmissionType,
          attributes: ['admission_type_description'],
        },
        {
          model: AdmissionBedBillingTypes,
          attributes: ['bed_billing_type_description'],
        },
        {
          model: AdmissionBedBillingTypes,
          attributes: ['bed_billing_type_description'],
        },
      ],
    });
    res.json(admission);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getAdmissionDetailByPatientID = async (req, res, next) => {
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
    const { rows, count } = await Admissions2.findAndCountAll({
      order: [['admission_date', 'DESC']],
      where: {
        patient_id: id,
      },
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
        {
          model: WardBed,
          attributes: ['bed_number'],
        },
        {
          model: Wards,
          attributes: ['ward_description'],
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

const editAdmissionDetail = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const user = await Admissions2.findOne({
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

const deleteAdmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Admissions2.destroy({
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
  addAdmission,
  getAllAdmission,
  getAdmissionDetail,
  editAdmissionDetail,
  deleteAdmission,
  getAdmissionDetailByPatientID,
};
