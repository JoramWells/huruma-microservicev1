/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Op } = require('sequelize');
const sequelize = require('../db/connect');
const Procedure_detail = require('../models/procedure/procedureDetails.model');
const Users = require('../models/user/user.model');
const InternalLabRequests = require('../models/_lab/internalLabRequests.model');
const Patient = require('../models/patient/patients.models');
const Appointments2 = require('../models/appointment/appointments.model');
const InsuranceDetail = require('../models/insurance/insuranceDetail.model');
const Patient_details = require('../models/patient/patients.models');
const ProcedureCategory = require('../models/procedure/procedureCategory.model');
const ServiceType = require('../models/services/serviceType.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

const addInternalLabRequest = async (req, res, next) => {
  try {
    const newAppointment = await InternalLabRequests.create(req.body);
    res.json(newAppointment);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal server error!!' });
  }
};


// get all priceListItems
const getAllInternalLabRequests = async (req, res, next) => {
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
    const { rows, count } = await InternalLabRequests.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Appointments2,
          order: [['appointment_date', 'DESC']],
          attributes: ['appointment_date'],
          include: [{
            model: InsuranceDetail,
            attributes: ['insurance_name'],
          }],
        },
        {
          model: Patient,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
        },
        {
          model: Users,
          attributes: ['full_name']
        },
        {
          model: Procedure_detail,
          attributes: ['procedure_name', 'procedure_cost'],
          include: [
            {
              model: ProcedureCategory,
              attributes: ['category_id', 'category_name', 'service_type_id'],
              include: [
                {
                  model: ServiceType,
                  attributes: ['service_type_id', 'service_type_description']
                }
              ]
            }
          ]
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
    res.sendStatus(500).json({ message: 'Internal server error!!' });
    next(error);
  }
};


const getInternalLabRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await InternalLabRequests.findAll({
      where: {
        lab_request_id: id,
      },
      include: [
        {
          model: Appointments2,
          attributes: ['appointment_date', 'charges', 'appointment_time'],
        },
        {
          model: Patient_details,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
        },
        {
          model: Procedure_detail,
          attributes: ['procedure_name', 'procedure_cost'],
        },
        {
          model: Users,
          attributes: ['full_name', 'status'],
        },
      ],
    });
    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.send('Internal Server Error');
    next(error);
  }
};

const editInternalLabRequest = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    InternalLabRequests.findOne({
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

const add = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    InternalLabRequests.findOne({
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
const deleteInternalLabRequest = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    InternalLabRequests.destroy({
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
  addInternalLabRequest,
  getAllInternalLabRequests,
  getInternalLabRequest,
  editInternalLabRequest,
  deleteInternalLabRequest,
};
