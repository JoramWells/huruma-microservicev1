/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const DoctorNotes = require('../../models/doctor/doctorNotes.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Appointments = require('../../models/appointment/appointments2.models');
const Users = require('../../models/user/user.model');
const PatientDetails = require('../../models/patient/patientDetails.model');

const addDoctorNotes = async (req, res, next) => {
  await DoctorNotes.create(req.body)
    .then((response) => {
      res.json(response.data);
      next();
    })
    .catch((error) => console.error(error));
};

const getAllDoctorNotes = async (req, res, next) => {
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
    const { rows, count } = await DoctorNotes.findAndCountAll({
      order: [['date_of_saving', 'DESC']],
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Appointments,
          attributes: ['appointment_date'],
          // include: [
          //   {
          //     model: Users,
          //     attributes: ['full_name']
          //   }
          // ]
        },
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name']
        },
        {
          model: Users,
          attributes: ['full_name']
        }
      ],
    })
    res.json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next()
  } catch (error) {
    console.log(error)
    next(error);
  }
};

// const getAllDoctorNotes = async (req, res, next) => {
//   try {
//     await sequelize.sync().then(() => {
//       DoctorNotes.findAll({
//         limit: 2,
//         include: [
//           {
//             model: Patient_details,
//             as: 'patients',
//           },
//         ],
//       })
//         .then((response) => {
//           console.log(response);
//           res.status(200).json(response);
//           // res.sendStatus(200)
//           next();
//         })
//         .catch((error) => {
//           next(error);
//           console.log(error);
//         });
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

const getDoctorNotesDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await DoctorNotes.findOne({
      where: {
        note_id: id,
      },
      include: [
        {
          model: Appointments,
          attributes: ['appointment_date'],
          // include: [
          //   {
          //     model: Users,
          //     attributes: ['full_name']
          //   }
          // ]
        },
        {
          model: PatientDetails,
          attributes: ['first_name', 'middle_name']
        },
        {
          model: Users,
          attributes: ['full_name']
        }
      ],
    })
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
};

const getDoctorNotesByMaternityID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admission = await DoctorNotes.findOne({
      where: {
        maternity_profile_id: id,
      },
      // include: [
      //   {
      //     model: Patient_details,
      //     attributes: ['first_name', 'middle_name', 'patient_gender', 'dob', 'cell_phone'],

      //   }
      // ]
    });
    res.json(admission);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editDoctorNotes = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    DoctorNotes.findOne({
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

const deleteDoctorNotes = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    DoctorNotes.destroy({
      where: {
        admission_id: id,
      },
    }).then((response) => {
      res.sendStatus(200).json(response);
      // console.log(response);
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  addDoctorNotes,
  getAllDoctorNotes,
  getDoctorNotesDetail,
  editDoctorNotes,
  deleteDoctorNotes,
  getDoctorNotesByMaternityID
};
