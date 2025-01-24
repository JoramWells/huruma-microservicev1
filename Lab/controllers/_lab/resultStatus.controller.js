/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const sequelize = require('../../db/connect');
const ResultStatus = require('../../models/_lab/resultStatus.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');



const addResultStatus = async (req, res, next) => {
  try {
    const results = await ResultStatus.create(req.body);
    res.json(results);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal server error!!' });
  }
};

// get all priceListItems
const getAllResultStatus = async (req, res, next) => {
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
    const { rows, count } = await ResultStatus.findAndCountAll({
      order: [['results_status_description', 'ASC']],
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

const getResultStatusDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await ResultStatus.findAll({
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

const editResultStatus = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  await sequelize.sync().then(() => {
    ResultStatus.findOne({
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

const deleteResultStatus = async (req, res, next) => {
  const { id } = req.params;
  await sequelize.sync().then(() => {
    ResultStatus.destroy({
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
  addResultStatus,
  getAllResultStatus,
  getResultStatusDetail,
  editResultStatus,
  deleteResultStatus,
};
