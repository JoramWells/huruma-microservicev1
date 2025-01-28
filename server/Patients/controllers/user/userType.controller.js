/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const User_types = require('../../models/user/userType.models');

const addUserType = async (req, res, next) => {
  // create data
  try {
    const results = await User_types.create(req.body).then((response) => {
      res.json(response.data);
      next();
    })
    res.json(results)
  } catch (error) {
    console.log(error)
    next(error)
  }
};

// get all pricelists
const getAllUserTypes = async (req, res, next) => {
  try {
    const results = await User_types.findAll({ limit: 100 })
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }

};

const getUserTypeDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    await sequelize.sync().then(() => {
      User_types.findOne({
        where: {
          id,
        },
      }).then((response) => {
        res.status(200).json(response);
      }).catch((error) => res.status(404).json(error.message));
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const editUserType = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    User_types.findOne({
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

module.exports = {
  addUserType, getAllUserTypes, getUserTypeDetail, editUserType,
};
