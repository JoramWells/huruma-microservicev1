/* eslint-disable camelcase */

const { Op } = require('sequelize');
const PersonalAccountCharge = require('../../models/charges/personalAccountCharges.model');
const PatientDetails = require('../../models/patientDetails.models');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Appointments2 = require('../../models/appointment/appointments.model');
const Service_type = require('../../models/services/serviceType.model');
// const Patient = require('../../models/charges/patient2.models');

// const Personal_account_charge = require('../models/personalAccountCharges.model');

const addPersonalAccountCharge = async (req, res, next) => {
  try {
    const results = await PersonalAccountCharge.create(req.body);
    // const results = await Personal_account_charge.findAll({
    //   where: {
    //     patient_id: userID,
    //   },
    // });
    res.status(200).json(results);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const addPersonalAccountCharge = async (req, res, next) => {
//   console.log(req.body);
//   try {
//     const { id } = req.params;
//     const { services } = req.body;
//     const parsedServices = JSON.parse(services);
//     const userID = parsedServices[0].patient_id;
//     const results = await Personal_account_charge.bulkCreate(parsedServices);
//     // const results = await Personal_account_charge.findAll({
//     //   where: {
//     //     patient_id: userID,
//     //   },
//     // });3
//     res.status(201).json(results);
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getAllPersonalAccountCharges = async (req, res, next) => {
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
    const { rows, count } = await PersonalAccountCharge.findAndCountAll({
      order: [['date_of_charge', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name'],
          where,

        },
        {
          model: Appointments2,
          attributes: ['appointment_date'],
        },
      ],
    });
    res.status(200).json({
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

const getPersonalAccountCharge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PersonalAccountCharge.findOne({
      where: {
        personal_account_charge_id: id,
      },
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name'],

        },
        {
          model: Appointments2,
          attributes: ['appointment_date'],
        },
        {
          model: Service_type,
          attributes: ['service_type_description'],
        },
      ],
    });
    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getUserPersonalAccountCharge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PersonalAccountCharge.findAll({
      where: {
        patient_id_pac: id,
      },
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
        },
      ],
    });
    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editPersonalAccountCharge = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const result = await PersonalAccountCharge.findOne({
      where: {
        id,
      },
    });
    result.firstName = firstName;
    result.save();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const deletePersonalAccountCharge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await PersonalAccountCharge.destroy({
      where: {
        personal_account_charge_id: id,
      },
    });
    next();
    if (results) {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addPersonalAccountCharge,
  getAllPersonalAccountCharges,
  getPersonalAccountCharge,
  editPersonalAccountCharge,
  deletePersonalAccountCharge,
  getUserPersonalAccountCharge,
};
