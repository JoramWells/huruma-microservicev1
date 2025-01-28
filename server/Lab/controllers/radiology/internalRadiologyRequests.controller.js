/* eslint-disable no-unused-vars */
const { Op } = require('sequelize')
const InternalLabRequests = require('../../models/_lab/internalLabRequests.model');
const ProcedureCategory = require('../../models/_procedure/procedureCategory.model');
const Procedure_detail = require('../../models/_procedure/procedureDetails.model');
const Radiology = require('../../models/radiology/radiology.models');
const ServiceType = require('../../models/services/serviceType.model');
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
    const { rows, count } = await InternalLabRequests.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: Procedure_detail,
          attributes: [],
          include: [
            {
              model: ProcedureCategory,
              attributes: ['procedure_name', 'procedure_cost'],
              include: [
                {
                  model: ProcedureCategory,
                  attributes: ['category_id', 'category_name', 'service_type_id'],
                  include: [
                    {
                      model: ServiceType,
                      attributes: ['service_type_id', 'service_type_description'],
                      where: {
                        service_type_description: 'Radiology'

                      },
                      required: true
                    }
                  ]
                }
              ]
            }
          ]

        }

      ]
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

const searchRadiology = async (req, res, next) => {
  const { searchQuery } = req.query;
  let where = {};

  try {
    // const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { procedure_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const results = await Procedure_detail.findAll({
      // page,
      // pageSize,
      // limit,
      // offset,
      where,
      include: [
        {
          model: ProcedureCategory,
          attributes: [],
          include: [
            {
              model: ServiceType,
              attributes: [],
              where: {
                service_type_description: 'Radiology'
              }
            }
          ]
        }
      ]
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ error: 'Internal Server error' });
    next(error);
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
  searchRadiology
};
