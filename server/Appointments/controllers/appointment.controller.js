/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// const { Kafka } = require('kafkajs');
const { Op } = require('sequelize');
const moment = require('moment');
const sequelize = require('../db/connect');
// const Insurance_detail = require('../../root/models/insurance/insurance.model');
const Patient = require('../models/patient/patients.model');
const InsuranceDetail = require('../models/insurance/insuranceDetail.model');
const Users = require('../models/user/user.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const PatientDetails = require('../models/patient/patientDetails.model');
const Appointments = require('../models/_appointment/appointments.model');
const ConsultationType = require('../models/consultation/consultationType.model');
const ConsultationTypesGroup = require('../models/consultation/consultationTypeGroups.model');
// const Patient = require('../../Patients/models/patient2.models');

// const kafka = new Kafka({
//   clientId: 'appointment',
//   brokers: ['kafka:9092', 'kafka:9092'],
// });

// const consumer = kafka.consumer({ groupId: 'appointment-create-group' });

// const addAppointments = async (req, res, next) => {
// await consumer.connect();
// await consumer.subscribe({ topic: 'register-patient' });

// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     console.log({
//       partition,
//     });
//   },
// });
// };

const addAppointments = async (req, res, next) => {
  console.log(req.body);

  try {
    // const isAppointed = await Appointments2.findOne({
    //   where: {
    //     patient_id: patientId,
    //   },
    // });

    // if (isAppointed) {
    //   isAppointed.patient_id = patientId;
    //   isAppointed.temperature = temperature;
    //   isAppointed.pulse_rate = pulse_rate;
    //   isAppointed.respiratory_rate = respiratoryRate;
    //   isAppointed.systolic = systolic;
    //   isAppointed.diastolic = diastolic;
    //   isAppointed.weight = weight;
    //   isAppointed.height = height;
    //   isAppointed.body_mass_index = bmi;
    //   isAppointed.sp02 = sp02;
    //   next();
    //   return isAppointed.save();
    // }
    const newAppointment = await Appointments.create(req.body);
    res.status(200).json(newAppointment);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    next(error);
  }
};

// get all priceListItems
const getAllAppointments = async (req, res, next) => {
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

    const { rows, count } = await Appointments.findAndCountAll({
      order: [['appointment_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name', 'last_name', 'patient_gender'],
          where,
        },
        {
          model: InsuranceDetail,
          attributes: ['insurance_name'],
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
    // console.log(appointmentResults);

    console.log('fetching data..');
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//
const getAppointmentPatientQueue = async (req, res, next) => {
  const {
    page, pageSize, searchQuery, appointment_date,
  } = req.query;

  const appointmentWhere = {
    appointment_date: appointment_date?.length > 0 ? appointment_date : moment().format('YYYY-MM-DD'),
  };

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

    const { rows, count } = await Appointments.findAndCountAll({
      order: [['appointment_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      where: appointmentWhere,
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name', 'last_name', 'patient_gender'],
          where,
        },
        {
          model: InsuranceDetail,
          attributes: ['insurance_name'],
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
    // console.log(appointmentResults);

    console.log('fetching data..');
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get all priceListItems
const getAllAppointmentsById = async (req, res, next) => {
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

    const { rows, count } = await Appointments.findAndCountAll({
      order: [['appointment_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      where: {
        patient_id: id,
      },
      include: [
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name', 'last_name', 'patient_gender'],
          // where,
        },
        {
          model: InsuranceDetail,
          attributes: ['insurance_name'],
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
  } catch (error) {
    next(error);
  }
};

const getAppointmentByPatientID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointment = await Appointments.findOne({
      order: [['appointment_date', 'DESC']],
      where: {
        patient_id: id,
      },
      // include: [
      //   {
      //     model: Account_type,
      //     attributes: ['account_type_description'],
      //   },
      // ],
    });
    res.json(appointment);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAppointmentDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Appointments.findOne({
      where: {
        appointment_id: id,
      },
      include: [
        {
          model: Patient,
          attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],

        },
        {
          model: InsuranceDetail,
          attributes: ['insurance_name'],
        },
        {
          model: Users,
          attributes: ['full_name'],
        },
        {
          model: ConsultationTypesGroup,
          attributes: ['consultation_type_group_description'],
        },
      ],
    });
    res.json(result);
    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const editAppointmentDetail = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    Appointments.findOne({
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
    Appointments.findOne({
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
const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    Appointments.destroy({
      where: {
        id,
      },
    }).then((response) => {
      res.status(200);
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  addAppointments,
  getAllAppointments,
  getAppointmentDetail,
  editAppointmentDetail,
  deleteAppointment,
  getAllAppointmentsById,
  getAppointmentPatientQueue,
  getAppointmentByPatientID,
};
