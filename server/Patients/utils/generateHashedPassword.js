const bcrypt = require('bcrypt');

const generateHashedPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

module.exports = {
    generateHashedPassword,
};
