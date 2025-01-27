/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const sequelize = require('../../db/connect');
const SpecimenTypes = require('../../models/_lab/specimenTypes.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');



const addSpecimenType = async (req, res, next) => {
  try {
    const results = await SpecimenTypes.create(req.body);
    res.json(results);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal server error!!' });
  }
};

// get all priceListItems
const getAllSpecimenTypes = async (req, res, next) => {
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
    const { rows, count } = await SpecimenTypes.findAndCountAll({
      order: [['specimen_type_description', 'ASC']],
      page,
      pageSize,
      limit,
      offset,
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
    res.sendStatus(500).json({ message: 'Internal server error!!' });
    next(error);
  }
};

const getSpecimenTypeDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await SpecimenTypes.findAll({
      where: {
        lab_request_id: id,
      },
    });
    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.send('Internal Server Error');
    next(error);
  }
};

const editSpecimenType = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    SpecimenTypes.findOne({
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

const deleteSpecimenType = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    SpecimenTypes.destroy({
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
  addSpecimenType,
  getAllSpecimenTypes,
  getSpecimenTypeDetail,
  editSpecimenType,
  deleteSpecimenType,
};
