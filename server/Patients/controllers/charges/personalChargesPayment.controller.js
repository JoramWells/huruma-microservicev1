/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const PatientDetails = require('../../models/patientDetails.models');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Appointments2 = require('../../models/appointment/appointments.model');
const PersonalChargesPayment = require('../../models/charges/personalChargesPayment.model');
const Users = require('../../models/user/user.model');
// const Patient = require('../../models/charges/patient2.models');

// const Personal_account_charge = require('../models/PersonalChargesPayments.model');

const addPersonalChargesPayment = async (req, res, next) => {
  try {
    const results = await PersonalChargesPayment.create(req.body);
    // const results = await Personal_account_charge.findAll({
    //   where: {
    //     patient_id: userID,
    //   },
    // });
    res.status(201).json(results);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const addPersonalChargesPayment = async (req, res, next) => {
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

// const getAllPersonalChargesPayments = async (req, res, next) => {
//   try {
//     const results = await PersonalChargesPayment.findAll({
//       attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('personal_account_charges.patient_id_pac')), 'patient_id_pac'],
//       [Sequelize.fn('COUNT', Sequelize.col('personal_account_charges.patient_id_pac')), 'patient_count']],
//       group: [
//         'personal_account_charges.patient_id_pac',
//         'date_of_charge',
//         'patient_detail.patient_id',
//       ],
//       include: [
//         {
//           model: PatientDetails,
//           attributes: ['first_name', 'middle_name'],
//         },
//       ],
//     });
//     res.json(results);
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//     next(error);
//   }
// };

const getAllPersonalChargesPayments = async (req, res, next) => {
  const {
    page, pageSize, searchQuery, status,
  } = req.query;
  let where = {};
  let patientWhere = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      patientWhere = {
        ...patientWhere,
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${searchQuery}%` } },
          { middle_name: { [Op.iLike]: `%${searchQuery}%` } },
          { last_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }

    if (status && status?.length > 0 && status === 'not cleared') {
      where = {
        ...where,
        cleared: 'NO',
      };
    } else if (status && status?.length > 0 && status === 'cleared') {
      where = {
        ...where,
        cleared: 'YES',
      };
    }

    const { rows, count } = await PersonalChargesPayment.findAndCountAll({
      order: [['date_of_payment', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      where,
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name'],
          patientWhere,
        },
        {
          model: Appointments2,
          attributes: ['appointment_date'],
        },
        {
          model: Users,
          attributes: ['full_name'],
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

const getPersonalChargesPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PersonalChargesPayment.findOne({
      where: {
        personal_account_charge_id: id,
      },
    });
    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getUserPersonalChargesPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PersonalChargesPayment.findAll({
      where: {
        patient_id_pac: id,
      },
      include: [
        {
          model: Patient,
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

const editPersonalChargesPayment = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const result = await PersonalChargesPayment.findOne({
      where: {
        id,
      },
    });
    result.firstName = firstName;
    return result.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePersonalChargesPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await PersonalChargesPayment.destroy({
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
  addPersonalChargesPayment,
  getAllPersonalChargesPayments,
  getPersonalChargesPayment,
  editPersonalChargesPayment,
  deletePersonalChargesPayment,
  getUserPersonalChargesPayment,
};
