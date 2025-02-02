/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const express = require('express');
const { Op } = require('sequelize');

const http = require('http');
const { Server } = require('socket.io');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');
const ResidenceDetails = require('../models/services/residenceDetails.model');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => { console.log('Connected to patient client'); });

// connect
// io.on('connection', (socket) => {
//   console.log('A client connected');
// });

// using *Patients model
const addResidenceDetails = async (req, res, next) => {
  try {
    const newProfile = await ResidenceDetails.create(req.body);
    res.status(200).json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllResidenceDetails = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { description: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await ResidenceDetails.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      where,
      order: [['residence_name', 'ASC']],
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

const getPeopleRelationDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const PeopleRelation = await ResidenceDetails.findOne({
      where: {
        id,
      },
    });
    res.json(PeopleRelation);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit PeopleRelation
const editPeopleRelation = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const result = await ResidenceDetails.findOne({
      where: {
        PeopleRelation_id: id,
      },
    });

    result.first_name = first_name;
    result.middle_name = middle_name;
    result.last_name = last_name;
    result.id_number = id_number;
    result.cell_phone = cell_phone;
    next();

    return result.save();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deletePeopleRelation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ResidenceDetails.destroy({
      where: {
        PeopleRelation_id: id,
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
  addResidenceDetails,
  getAllResidenceDetails,
  getPeopleRelationDetail,
  editPeopleRelation,
  deletePeopleRelation,
};
