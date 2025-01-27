/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// const { Kafka } = require('kafkajs');
const { Op } = require('sequelize');
const sequelize = require('../../db/connect');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const ConsultationGroupsWithCreditAccount = require('../../models/consultation/consultationGroupWithCreditAccount.model');

// const Patient = require('../../Patients/models/patient2.models');

// const kafka = new Kafka({
//   clientId: 'appointment',
//   brokers: ['kafka:9092', 'kafka:9092'],
// });

// const consumer = kafka.consumer({ groupId: 'appointment-create-group' });

const addConsultationGroupsWithCreditAccount = async (req, res, next) => {
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

// const addConsultationGroupsWithCreditAccount = async (req, res, next) => {
//   const {
//     patientId, temperature, pulse_rate, respiratoryRate,
//     systolic, diastolic, weight, height, bmi, sp02,
//   } = req.body;

//   try {
//     const isAppointed = await ConsultationGroupsWithCreditAccount.findOne({
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
//     const newAppointment = await ConsultationGroupsWithCreditAccount.create(req.body);
//     res.json(newAppointment);

//     next();
//   } catch (error) {
//     res.sendStatus(500);
//   }
// };

// get all priceListItems
const getAllConsultationGroupsWithCreditAccount = async (req, res, next) => {
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

    const { rows, count } = await ConsultationGroupsWithCreditAccount.findAndCountAll({
      order: [['appointment_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      // include: [
      //   {
      //     model: PatientDetails,
      //     attributes: ['first_name', 'middle_name', 'last_name', 'patient_gender'],
      //     where,
      //   },
      //   {
      //     model: InsuranceDetail,
      //     attributes: ['insurance_name'],
      //   },
      //   {
      //     model: Users,
      //     attributes: ['full_name'],
      //   },
      // ],
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
const getAllConsultationGroupsWithCreditAccountById = async (req, res, next) => {
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

    const { rows, count } = await ConsultationGroupsWithCreditAccount.findAndCountAll({
      order: [['appointment_date', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      where: {
        patient_id: id,
      },
      // include: [
      //   {
      //     model: PatientDetails,
      //     attributes: ['first_name', 'middle_name', 'last_name', 'patient_gender'],
      //     // where,
      //   },
      //   {
      //     model: InsuranceDetail,
      //     attributes: ['insurance_name'],
      //   },
      //   {
      //     model: Users,
      //     attributes: ['full_name'],
      //   },
      // ],
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

// const getAppointmentDetail = async (req, res, next) => {
//   const { id } = req.params;
//   await sequelize.sync().then(() => {
//     ConsultationGroupsWithCreditAccount.findOne({
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

const getAppointmentDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await ConsultationGroupsWithCreditAccount.findOne({
      where: {
        appointment_id: id,
      },
      // include: [
      //   {
      //     model: Patient,
      //     attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],

      //   },
      //   {
      //     model: InsuranceDetail,
      //     attributes: ['insurance_name'],
      //   },
      //   {
      //     model: Users,
      //     attributes: ['full_name'],
      //   },
      //   {
      //     model: ConsultationTypesGroup,
      //     attributes: ['consultation_type_group_description'],
      //   },
      // ],
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
    ConsultationGroupsWithCreditAccount.findOne({
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
    ConsultationGroupsWithCreditAccount.findOne({
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
    ConsultationGroupsWithCreditAccount.destroy({
      where: {
        id,
      },
    }).then((response) => {
      res.status(200);
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  addConsultationGroupsWithCreditAccount,
  getAllConsultationGroupsWithCreditAccount,
  getAppointmentDetail,
  editAppointmentDetail,
  deleteAppointment,
  getAllConsultationGroupsWithCreditAccountById,
};
