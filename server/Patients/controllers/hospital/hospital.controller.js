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

// const kafka = new Kafka({
//   clientId: 'Hospital',
//   brokers: ['kafka-1:29092', 'kafka-2:39092'],
// });

// const producer = kafka.producer();

const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const HospitalDetail = require('../../models/hospital/hospitalDetails.model');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => { console.log('Connected to Hospital client'); });

// connect
// io.on('connection', (socket) => {
//   console.log('A client connected');
// });

// using *Hospitals model
const addHospitals = async (req, res, next) => {
  try {
    const hospital = await HospitalDetail.create(req.body);
    res.json(hospital);
    next();
  } catch (error) {
    console.log(error);
  }
};

// get all priceListItems
const getAllHospitals = async (req, res, next) => {
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
    const { rows, count } = await HospitalDetail.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where,
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

const searchHospitals = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    // const { limit, offset } = calculateLimitAndOffset(page, pageSize);

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
    const results = await HospitalDetail.findAll({
      // page,
      // pageSize,
      // limit,
      // offset,
      where,
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ error: 'Internal Server error' });
    next(error);
  }
};

const getHospitalDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const Hospital = await HospitalDetail.findOne({
      where: {
        Hospital_id: id,
      },
    });
    res.json(Hospital);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit Hospital
const editHospital = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await HospitalDetail.findOne({
      where: {
        Hospital_id: id,
      },
    });

    results.first_name = first_name;
    results.middle_name = middle_name;
    results.last_name = last_name;
    results.id_number = id_number;
    results.cell_phone = cell_phone;
    results.save();

    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteHospital = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await HospitalDetail.destroy({
      where: {
        Hospital_id: id,
      },
    });

    if (results) {
      res.status(200).json({ message: 'User deleted successfully' });
      next();
    }
    res.status(404).json({ message: 'User not found.' });
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

module.exports = {
  addHospitals, getAllHospitals, getHospitalDetail, editHospital, deleteHospital, searchHospitals,
};
