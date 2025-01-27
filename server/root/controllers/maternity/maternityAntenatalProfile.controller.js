/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../../db/connect');
const Maternity_antenatal_profile = require('../../models/maternity/maternityAntenatalProfile.model');
const Maternity_profile = require('../../models/maternity/maternityProfile.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Patient_details = require('../../models/patient/patientDetails.models');

const addMaternityAntenatalProfile = async (req, res, next) => {
  sequelize.sync().then(() => {
    Maternity_antenatal_profile.create(req.body)
      .then((response) => {
        res.json(response.data);
        next();
      })
      .catch((error) => console.error(error));
  });
};

const getAllMaternityAntenatalProfile = async (req, res, next) => {
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
    const { rows, count } = await Maternity_antenatal_profile.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Maternity_profile,
          attributes: ['name_of_client'],
        },
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
    next(error);
  }
};

// const getAllMaternityAntenatalProfile = async (req, res, next) => {
//   try {
//     await sequelize.sync().then(() => {
//       Maternity_antenatal_profile.findAll({
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

const getMaternityAntenatalProfileDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    Maternity_antenatal_profile.findOne({
      where: {
        hospital_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const getMaternityAntenatalProfileByMaternityID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admission = await Maternity_antenatal_profile.findOne({
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

const editMaternityAntenatalProfile = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    Maternity_antenatal_profile.findOne({
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

const deleteMaternityAntenatalProfile = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    Maternity_antenatal_profile.destroy({
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
  addMaternityAntenatalProfile,
  getAllMaternityAntenatalProfile,
  getMaternityAntenatalProfileDetail,
  editMaternityAntenatalProfile,
  deleteMaternityAntenatalProfile,
  getMaternityAntenatalProfileByMaternityID
};
