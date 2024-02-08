/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const sequelize = require('../../db/connect');
// const Patient_details = require('../../models/patient/patients.models');
const Procedure_detail = require('../../models/procedure/procedureDetails.model');
const Users = require('../../models/user.model');
// const Appointments = require('../../models/appointment/appointments.models');
const Internal_lab_request2 = require('../../models/lab/internalLabRequests2.model');
// const Appointments2 = require('../../models/appointment/appointments2.models');
// const Patient = require('../../models/patient/patient2.models');

const addInternalLabRequest = async (req, res, next) => {
  try {
    const newAppointment = await Internal_lab_request2.create(req.body);
    res.json(newAppointment);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal server error!!' });
  }
};

// get all priceListItems
const getAllInternalLabRequests = async (req, res, next) => {
  try {
    const results = await Internal_lab_request2.findAll({
      limit: 100,
      // include: [
      //   {
      //     model: Appointments2,
      //     attributes: ['appointment_date'],
      //   },
      //   {
      //     model: Patient,
      //     attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
      //   },
      // ],
    });
    res.json(results);
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
    const result = await Internal_lab_request2.findAll({
      where: {
        patient_id: id,
      },
      include: [
        // {
        //   model: Appointments2,
        //   attributes: ['appointment_date', 'charges', 'appointment_time'],
        // },
        // {
        //   model: Patient,
        //   attributes: ['first_name', 'middle_name', 'dob', 'patient_gender'],
        // },
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
    Internal_lab_request2.findOne({
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
    Internal_lab_request2.findOne({
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
    Internal_lab_request2.destroy({
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
