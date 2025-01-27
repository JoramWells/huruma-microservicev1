/* eslint-disable no-unused-vars */
const Radiology = require('../../models/radiology/radiology.models');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addRadiologyRequest = async (req, res, next) => {
  try {
    const results = await Radiology.create(req.body)
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }

};

// get all priceListItems
const getAllRadiologyRequests = async (req, res, next) => {
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
    const { rows, count } = await Radiology.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
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

const getRadiologyRequestDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Radiology.findOne({
      where: {
        id,
      },
    })

    res.json(results)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
};

const editRadiologyRequestDetail = async (req, res, next) => {
  const { id, serviceName, serviceCategory } = req.body;
  try {
    const results = await Radiology.findOne({
      where: {
        id,
      },
    })
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
  }

};

module.exports = {
  addRadiologyRequest,
  getAllRadiologyRequests,
  getRadiologyRequestDetail,
  editRadiologyRequestDetail,
};
