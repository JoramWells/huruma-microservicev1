/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const moment = require('moment/moment');
const express = require('express');
const { Op } = require('sequelize');

const http = require('http');
const { Server } = require('socket.io');
// const { Kafka } = require('kafkajs');
const sequelize = require('../db/connect');

// const kafka = new Kafka({
//   clientId: 'patient',
//   brokers: ['kafka-1:29092', 'kafka-2:39092'],
// });

// const producer = kafka.producer();

// const Patient_details = require('../models/patients.models');
// const Appointments2 = require('../../Appointments/models/appointments2.models');
const InsuranceServiceCostMapping = require('../models/insurance/insuranceServiceCostMapping.model');
const Appointments2 = require('../models/appointment/appointments.model');
const Patient_details = require('../models/patients.models');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => { console.log('Connected to patient client'); });

// connect
// io.on('connection', (socket) => {
//   console.log('A client connected');
// });

// using *Patients model
const addPatients = async (req, res, next) => {
  try {
    // await producer.connect();
    const { insuranceAccount } = req.body;

    // the reference account_id is the id of the insurance-service-cost-mapping
    const reference_account_id = insuranceAccount?.value;

    console.log(req.body);
    // await producer.send({
    //   topic: 'register-patient',
    //   messages: [
    //     {
    //       value: 'hello',
    //     },
    //   ],
    // });

    // await producer.disconnect();

    // create a new user profile
    const newProfile = await Patient_details.create(req.body);
    let newAppointment = {};

    // // Check if user has a corporate. results = null, charges = 0
    if (insuranceAccount) {
      const results = await InsuranceServiceCostMapping.findOne({
        where: {
          insurance_id: reference_account_id,
        },
      });

      if (results?.cost) {
        const { cost } = results;

        newAppointment = await Appointments2.afterCreate({
          patient_id: newProfile?.patient_id,
          account_type_id: req.body.account_type_id,
          appointment_date: moment().format('YYYY-MM-DD'),
          appointment_time: moment().format('hh:mm:ss'),
          charges: cost,
          reference_account_id,
        });
        io.emit('newAppointment');
      }
    } else {
      // // Create ew Appointment. Initial amount 350 for new patient
      newAppointment = await Appointments2.afterCreate({
        patient_id: newProfile?.patient_id,
        account_type_id: req.body.account_type_id,
        appointment_date: moment().format('YYYY-MM-DD'),
        appointment_time: moment().format('hh:mm:ss'),
        charges: 350,
        reference_account_id,
      });
    }

    res.status(201).json({
      patient_id: newProfile.patient_id,
      appointment_id: newAppointment.appointment_id,
    });
    res.status(200);
    next();
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllPatients = async (req, res, next) => {
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
    const { rows, count } = await Patient_details.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where
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
    res.sendStatus(500).json({ error: 'Internal Server error' });
    next(error);
  }
};

const getPatientDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Patient_details.findOne({
      where: {
        patient_id: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editPatient = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Patient_details.findOne({
      where: {
        patient_id: id,
      },
    });

    editPAtient.first_name = first_name;
    editPAtient.middle_name = middle_name;
    editPAtient.last_name = last_name;
    editPAtient.id_number = id_number;
    editPAtient.cell_phone = cell_phone;
    next();

    return editPAtient.save();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Patient_details.destroy({
      where: {
        patient_id: id,
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
  addPatients, getAllPatients, getPatientDetail, editPatient, deletePatient,
};
