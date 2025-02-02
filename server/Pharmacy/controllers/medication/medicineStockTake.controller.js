/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// const Redis = require('redis');
const { Op, col, fn } = require('sequelize');
const Medication_stock_take = require('../../models/medication/medicationStockTake.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const Medication_category = require('../../models/medication/medicationCategory.models');

// // create redis client
// const redisClient = Redis.createClient({
//   host: '127.0.0.1',
//   port: '6379',
// });
// redisClient.on('error', (error) => {
//   console.error(error);
// });

const EXPIRATION = 3600;

const addMedicationStockTake = async (req, res, next) => {
  try {
    const result = await Medication_stock_take.create(req.body);
    res.status(201).json(result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMedicationStockTake = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query
  let where = {}

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize)

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { medication_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }


    const [data, count] = await Promise.all([
      Medication_stock_take.findAndCountAll({
        order: [['date_of_stock_take', 'DESC']],
        page,
        pageSize,
        limit,
        offset,
        where,
        include: [
          {
            model: Medication_category,
            attributes: ['category_name']
          }
        ],
        attributes: [
          [fn("MAX", col('date_of_stock_take')), 'latest_stock_take_date'],
          "medication_id",
          "medication_name",
          "medication_packaging_type_description",
          "current_quantity",
          "correct_quantity",
          'quantity_variance',
          'medication_stock_take_id'
        ],
        group: [
          "medication_id",
          "medication_category.category_id",
          "medication_category.category_name",
          "medication_stock_take_id",
        ]
      }),
      Medication_stock_take.count({
        distinct: true,
        col: 'medication_name',
        where
      })

    ])

    // const count = await Medication_stock_take.count({
    //   distinct: true,
    //   col: 'medication_name'
    // })

    res.json({
      data: data.rows,
      total: count,
      page: page,
      pageSize: limit,
    })
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getMedicationStockTakeDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Medication_stock_take.findOne({
      where: {
        medication_stock_take_id: id,
      },
    });
    res.json(result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 
const getAllMedicationStockTakeDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Medication_stock_take.findAll({
      order: [['date_of_stock_take', 'ASC']],
      where: {
        medication_id: id,
      },
    });
    res.json(result);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editMedicationStockTake = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const user = await Medication_stock_take.findOne({
      where: {
        id,
      },
    });
    user.firstName = firstName;
    return user.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteMedicationStockTake = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Medication_stock_take.destroy({
      where: {
        result_id: id,
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

// 
const getMedicationStockTakeRange = async (req, res, next) => {
  try {
    const results = await Medication_stock_take.findAll({
      // limit: 10,
      attributes: [
        [col("date_of_stock_take"), "date_of_stock_take"],
        [col("medication_name"), "medication_name"],
        [fn("COUNT", col("date_of_stock_take")), 'count']
      ],
      group: [
        "medication_name",
        "date_of_stock_take"
      ]
    })
    res.json(results)
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addMedicationStockTake,
  getAllMedicationStockTake,
  getMedicationStockTakeDetail,
  editMedicationStockTake,
  deleteMedicationStockTake,
  getMedicationStockTakeRange,
  getAllMedicationStockTakeDetail
};
