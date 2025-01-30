/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// const { Kafka } = require('kafkajs');
const { Op } = require('sequelize');
const sequelize = require('../db/connect');
// const Insurance_detail = require('../../root/models/insurance/insurance.model');
const Patient = require('../models/patient/patients.model');
const Users = require('../models/user/user.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const AppointmentDiagnoses = require('../models/_appointment/AppointmentDiagnosis.model');
const Appointments = require('../models/_appointment/appointments.model');
const DoctorNotes = require('../models/doctor/doctorNotes.model');
// const Patient = require('../../Patients/models/patient2.models');

// const kafka = new Kafka({
//   clientId: 'appointment',
//   brokers: ['kafka:9092', 'kafka:9092'],
// });

// const consumer = kafka.consumer({ groupId: 'appointment-create-group' });

const addAppointmentDiagnoses = async (req, res, next) => {
  // await consumer.connect();
  // await consumer.subscribe({ topic: 'register-patient' });

  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log({
  //       partition,
  //     });
  //   },
  // });
};

// const addAppointmentDiagnoses = async (req, res, next) => {
//   const {
//     patientId, temperature, pulse_rate, respiratoryRate,
//     systolic, diastolic, weight, height, bmi, sp02,
//   } = req.body;

//   try {
//     const isAppointed = await AppointmentDiagnoses.findOne({
//       where: {
//         patient_id: patientId,
//       },
//     });

//     if (isAppointed) {
//       isAppointed.patient_id = patientId;
//       isAppointed.temperature = temperature;
//       isAppointed.pulse_rate = pulse_rate;
//       isAppointed.respiratory_rate = respiratoryRate;
//       isAppointed.systolic = systolic;
//       isAppointed.diastolic = diastolic;
//       isAppointed.weight = weight;
//       isAppointed.height = height;
//       isAppointed.body_mass_index = bmi;
//       isAppointed.sp02 = sp02;
//       next();
//       return isAppointed.save();
//     }
//     const newAppointment = await AppointmentDiagnoses.create(req.body);
//     res.json(newAppointment);

//     next();
//   } catch (error) {
//     res.sendStatus(500);
//   }
// };

// get all priceListItems
const getAllAppointmentDiagnoses = async (req, res, next) => {
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

    const { rows, count } = await AppointmentDiagnoses.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: DoctorNotes,
          attributes: ['diagnosis'],
        },
        {
          model: Appointments,
          attributes: ['appointment_status', 'appointment_date', 'patient_id'],
          order: [['appointment_date', 'DESC']],

          include: [
            {
              model: Patient,
              attributes: ['first_name', 'middle_name', 'last_name', 'patient_gender'],
              where,
            },
          ],
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
const getAllAppointmentDiagnosesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointmentResults = await AppointmentDiagnoses.findOne({
      where: {
        appointment_diagnosis_id: id,
      },
      include: [
        {
          model: DoctorNotes,
          attributes: ['diagnosis'],
        },
        {
          model: Appointments,
          attributes: ['appointment_status', 'appointment_date', 'patient_id'],
        },
      ],
    });

    res.json(appointmentResults);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// const getAppointmentDetailDiagnoses = async (req, res, next) => {
//   const { id } = req.params;
//   await sequelize.sync().then(() => {
//     AppointmentDiagnoses.findOne({
//       where: {
//         appointment_id: id,
//       },
//       include: [
//         {
//           model: Account_type,
//           attributes: ['account_type_description'],
//         },
//       ],
//     }).then((response) => {
//       res.json(response);
//     }).catch((error) => console.error(error));
//   });
// };

const getAppointmentDetailDiagnoses = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointmentResults = await AppointmentDiagnoses.findOne({
      where: {
        appointment_diagnosis_id: id,
      },
      include: [
        {
          model: DoctorNotes,
          attributes: ['diagnosis'],
        },
        {
          model: Appointments,
          attributes: ['appointment_status', 'appointment_date', 'patient_id'],
          include: [
            {
              model: Users,
              attributes: ['full_name'],
            },
          ],
        },
      ],
    });

    res.json(appointmentResults);
    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const editAppointmentDetailDiagnoses = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    AppointmentDiagnoses.findOne({
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
    AppointmentDiagnoses.findOne({
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
const deleteAppointmentDiagnoses = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    AppointmentDiagnoses.destroy({
      where: {
        id,
      },
    }).then((response) => {
      res.status(200);
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  addAppointmentDiagnoses,
  getAllAppointmentDiagnoses,
  getAppointmentDetailDiagnoses,
  editAppointmentDetailDiagnoses,
  deleteAppointmentDiagnoses,
  getAllAppointmentDiagnosesById,
};
