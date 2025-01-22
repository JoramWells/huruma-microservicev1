/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../db/connect');
const Account_type = require('../models/_accounts/accountTypes.model');
const { calculateLimitAndOffset } = require('../utils/calculateLimitAndOffset');

// Account_type.belongsTo(Patient_details, { foreignKey: 'patient_id', as: 'patient_details' });
// Account_type.hasMany(Patient_details, { as: 'patients', foreignKey: 'patient_id' });

const addAccountType = async (req, res, next) => {
  try {
    const results = await Account_type.create(req.body);
    res.json(results);
    next();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllAccountTypes = async (req, res, next) => {
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
    const { rows, count } = await Account_type.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
    });
    res.status(200).json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    next(error);
  }
};

// const getAllAccountTypes = async (req, res, next) => {
//   try {
//     await sequelize.sync().then(() => {
//       Account_type.findAll({
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

const getAccountTypeDetail = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    Account_type.findOne({
      where: {
        account_type_id: id,
      },
    }).then((response) => {
      res.json(response);
    }).catch((error) => console.error(error));
  });
};

const editAccountType = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    Account_type.findOne({
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

const deleteAccountType = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    Account_type.destroy({
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
  addAccountType,
  getAllAccountTypes,
  getAccountTypeDetail,
  editAccountType,
  deleteAccountType,
};
