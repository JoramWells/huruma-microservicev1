/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */

const InternalLabRequests = require('../../models/_lab/internalLabRequests.model');
const Procedure_item_result = require('../../models/_procedure/procedureItemResults.model');
const ProcedureItem = require('../../models/_procedure/procedureItems.model');
const ProcedureItemsConclusions = require('../../models/_procedure/procedureItemsConclusions.model');
const Appointments = require('../../models/appointment/appointments2.models');
const PatientDetails = require('../../models/patient/patientDetails.model');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');

const addProcedureItemResults = async (req, res, next) => {
  try {
    const results = Procedure_item_result.create(req.body);
    res.status(201).json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProcedureItemResults = async (req, res, next) => {
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
    const { rows, count } = await Procedure_item_result.findAndCountAll({
      page,
      pageSize,
      limit,
      offset,
      include: [
        {
          model: ProcedureItem,
          attributes: ['procedure_item_description']
        },
        {
          model: ProcedureItemsConclusions,
          attributes: ['procedure_items_conclusion_description']
        },
        {
          model: Appointments,
          attributes: ['appointment_date']
        },
        {
          model: InternalLabRequests,
          attributes: ['results'],
          include: [
            {
              model: PatientDetails,
              attributes: ['patient_id', 'first_name', 'middle_name']
            }
          ]
        }
      ]
    });
    res.status(200).json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error)
    next(error);
  }
};

const getProcedureItemResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Procedure_item_result.findOne({
      where: {
        admission_id: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error)
  }
};

// 
const getProcedureItemResultByInternalLabRequestID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Procedure_item_result.findOne({
      where: {
        lab_request_id: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error)
  }
};

// 

const editProcedureItemResult = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const results = await Procedure_item_result.findOne({
      where: {
        id,
      },
    });
    results.firstName = firstName;
    return results.save();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProcedureItemResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Procedure_item_result.destroy({
      where: {
        admission_id: id,
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

module.exports = {
  addProcedureItemResults,
  getAllProcedureItemResults,
  getProcedureItemResult,
  editProcedureItemResult,
  deleteProcedureItemResult,
  getProcedureItemResultByInternalLabRequestID
};
