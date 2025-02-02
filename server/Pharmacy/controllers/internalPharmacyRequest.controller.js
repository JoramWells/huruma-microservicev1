/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Sequelize = require('sequelize');
const sequelize = require('../db/connect');
// const Appointments = require('../../models/appointment/appointments.models');
const Medication = require('../models/medication/medication.model');
// const Patient = require('../../models/patient/patient2.models');
const Internal_pharmacy_request2 = require('../models/_pharmacy/internalPharmacyRequests.models2');
const Procedure_detail = require('../models/procedure/procedureDetails.model');
const Users = require('../models/user/user.model');
const Patient = require('../models/patient/patient2.models');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const PatientDetails = require('../models/patient/patientDetails.model');
const Appointments = require('../models/appointment/appointments.model');

const addInternalPharmacyRequest = async (req, res, next) => {
  try {
    const newAppointment = await Internal_pharmacy_request2.create(req.body);
    res.json(newAppointment);

    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal server error!!' });
  }
};

// get all priceListItems
const getAllInternalPharmacyRequests = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { first_name: { [Sequelize.Op.iLike]: `%${searchQuery}%` } },
          { middle_name: { [Op.iLike]: `%${searchQuery}%` } },
          { last_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await Internal_pharmacy_request2.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      order: [
        [Sequelize.literal("CAST(TO_DATE(date_of_request, 'YYYY-MM-DD') AS DATE)"), 'DESC']

      ],
      // attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('internal_pharmacy_request2s.appointment_id')), 'appointment_id']],
      // group: ['internal_pharmacy_request2s.appointment_id', 'patient.patient_id'],
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name', 'last_name', 'dob', 'patient_id'],
        },
        {
          model: Appointments,
          attributes: ['appointment_date'],


        },
        {
          model: Users,
          attributes: ['full_name']
        },
        {
          model: Medication,
          attributes: ['medication_name', 'price']
        }
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
    next(error);
    res.sendStatus(500).json({ message: 'Internal server error!!' });
  }
};

const getInternalPharmacyRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Internal_pharmacy_request2.findOne({
      where: {
        pharmacy_request_id: id,
      },
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender', 'cell_phone'],
        },
        {
          model: Medication,
          attributes: ['medication_name', 'price']
        },
        {
          model: Appointments,
          attributes: ['appointment_date'],
        },
        {
          model: Users,
          attributes: ['full_name']
        },
      ],
    });
    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const editInternalPharmacyRequest = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    Internal_pharmacy_request2.findOne({
      where: {
        id,
      },
    })
      .then((response) => {
        response.service_name = serviceName;
        response.service_category = serviceCategory;
        return response.save();
      })
      .catch((error) => console.error(error));
  });
};

// add vitals

const deleteInternalPharmacyRequest = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    Internal_pharmacy_request2.destroy({
      where: {
        id,
      },
    }).then((response) => {
      console.log(response);
      res.status(200);
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  addInternalPharmacyRequest,
  getAllInternalPharmacyRequests,
  getInternalPharmacyRequest,
  editInternalPharmacyRequest,
  deleteInternalPharmacyRequest,
};
