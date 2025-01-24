/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
const internalPharmacyRequestRoutes = require('./routes/internalPharmacyRequest.routes');
const medicationRoutes = require('./routes/medication/medication.routes');
const medicationCategoryRoutes = require('./routes/medication/medicationCategory.routes');
const medicinePurchaseRoutes = require('./routes/medication/medicinePurchases.routes');
const medicationStockTakeRoutes = require('./routes/medication/medicationStockTake.routes');
const medicinePackagingRoutes = require('./routes/medication/medicinePackaging.routes');


const app = express();

const PORT = process.env.PORT || 5007;
const corsOption = {
    origin: ['*'],
};

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// enable cors
app.use(cors());

app.use('/internal-pharmacy-requests', internalPharmacyRequestRoutes);
app.use('/medication', medicationRoutes);
app.use('/medication-category', medicationCategoryRoutes);
app.use('/medication-purchase', medicinePurchaseRoutes);
app.use('/medication-stock-take', medicationStockTakeRoutes);
app.use('/medicine-packaging', medicinePackagingRoutes);

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
