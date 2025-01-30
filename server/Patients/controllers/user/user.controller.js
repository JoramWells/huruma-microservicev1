/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const Users = require('../../models/user/user.model');
const User_types = require('../../models/user/userType.models');
const { calculateLimitAndOffset } = require('../../utils/calculateLimitAndOffset');
const { generateHashedPassword } = require('../../utils/generateHashedPassword');

const addUser = async (req, res, next) => {
  // create user
  try {
    const user = Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res, next) => {
  const { page, pageSize, searchQuery } = req.query;
  let where = {};

  try {
    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    if (searchQuery) {
      where = {
        ...where,
        [Op.or]: [
          { full_name: { [Op.iLike]: `%${searchQuery}%` } },
          { user_name: { [Op.iLike]: `%${searchQuery}%` } },
          // { last_name: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      };
    }
    const { rows, count } = await Users.findAndCountAll({
      order: [['user_name', 'ASC']],
      page,
      pageSize,
      limit,
      offset,
      where,
      include: [
        {
          model: User_types,
          attributes: ['user_type_desc'],
        },
      ],
    });
    res.json({
      data: rows,
      total: count,
      page,
      pageSize: limit,
    });
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({
      where: {
        user_id: id,
      },
      include: [
        {
          model: User_types,
          attributes: ['user_type_desc'],
        },
      ],
    });
    res.json(user);
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
    // next(error);
  }
};

const login = async (req, res, next) => {
  const { firstName, password, hospitalID } = req.body;
  console.log(req.body);
  try {
    const user = await Users.findOne({
      where: {
        user_name: firstName,
        hospital_id: hospitalID,
      },
    });

    //
    if (!user) {
      console.log('User not found!!');
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.password) {
      console.log('User password is missing!!');
      return res.status(400).json({ message: 'User password missing' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    //
    if (!isMatch) {
      console.log('Password does not match!!');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Successful!!');
    return res.json(user); // Do not call next() after sending response
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const findUser = await Users.findOne({
      where: {
        user_id: id,
      },
    });

    if (findUser) {
      const passwordHash = await generateHashedPassword(password);
      findUser.password = passwordHash;
      await findUser.save();
      res.json(findUser);
      next();
    } else {
      res.status(404).json({ message: 'User Not Found' });
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const editUser = async (req, res, next) => {
  const { id, firstName } = req.body;
  try {
    const user = await Users.findOne({
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

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const results = await Users.destroy({
      where: {
        id: userId,
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
  addUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  login,
  updatePassword,
};
