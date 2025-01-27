/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../models/patient/patient.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Maternity_delivery = require('../../models/maternity/maternityDelivery.model');
const Maternity_profile = require('../../models/maternity/maternityProfile.model');
const Patient_details = require('../../models/patient/patientDetails.models');
// const Patient_details = require('../../models/patient/patients.models');
// const Appointments2 = require('../../models/appointment/appointments2.models');

const addMaternityDelivery = async (req, res, next) => {
  try {
    const newProfile = Maternity_delivery.create(req.body);
    res.status(201).json(newProfile);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMaternityDeliveries = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { name_of_client: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }

    const { rows, count } = await Maternity_delivery.findAndCountAll({
      // order: [
      //   [Sequelize.literal("CAST(TO_DATE(edd, 'DD/MM/YYYY') AS DATE)"), 'DESC']
      // ],
      page,
      pageSize,
      limit,
      offset,
      where: {
        ...where,
        // edd: {
        //   [Op.ne]: ''
        // }
      },
      include: [
        {
          model: Maternity_profile,
          attributes: ['name_of_client']
        }
      ]
    });
    res.json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error)
    next(error);
  }
};

const getMaternityDeliveryDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admission = await Maternity_delivery.findOne({
      where: {
        maternity_delivery_id: id,
      },
      include: [
        {
          model: Maternity_profile,
          attributes: ['name_of_client'],
          include: [{
            model: Patient_details,
            attributes: ['first_name', 'middle_name', 'cell_phone', 'patient_gender', 'dob'],


          }]
        },
        //   {
        //     model: Patient_details,
        //     attributes: ['first_name'],
        //   },
      ],
    });
    res.json(admission);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 
const getMaternityDeliveryDetailByMaternityID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admission = await Maternity_delivery.findOne({
      where: {
        maternity_profile_id: id,
      },
      // include: [
      //   {
      //     model: Appointments2,
      //     attributes: ['appointment_date'],
      //   },
      //   {
      //     model: Patient_details,
      //     attributes: ['first_name'],
      //   },
      // ],
    });
    res.json(admission);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editMaternityDelivery = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const user = await Maternity_delivery.findOne({
      where: {
        id,
      },
    });
    user.firstName = firstName;

    // save
    user.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteMaternityDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Maternity_delivery.destroy({
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
  addMaternityDelivery,
  getAllMaternityDeliveries,
  getMaternityDeliveryDetail,
  editMaternityDelivery,
  deleteMaternityDelivery,
  getMaternityDeliveryDetailByMaternityID
};
