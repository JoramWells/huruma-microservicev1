/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
const accountTypeRoutes = require('../Accounts/routes/accountType.routes');
const accountingSupplierRoutes = require('../Accounts/routes/accountingSupplier.routes');
const accountingItemRoutes = require('../Accounts/routes/accountingItem.routes');

const app = express();

const PORT = process.env.PORT || 5009;
const corsOption = {
    origin: ['*'],
};

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// enable cors
app.use(cors());

app.use('/account-type', accountTypeRoutes);
app.use('/accounting-suppliers', accountingSupplierRoutes);
app.use('/accounting-items', accountingItemRoutes);

// app.use((err, req, res, next) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || 'Something went wrong';
//   return res.status(errStatus).json(errMessage);
// });

const testConnection = async () => {
    await sequelize.authenticate().then(() => {
        console.log('Connected to database successfully');
    }).catch((error) => {
        console.error('Unable to connect to database: ', error);
    });
};

testConnection();

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
