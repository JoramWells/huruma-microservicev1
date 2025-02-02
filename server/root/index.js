/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const sequelize = require('./db/connect');
const priceRoutes = require('./routes/pricelists.routes');
const itemTypeRoutes = require('./routes/itemType.routes');
const subItemRoutes = require('./routes/subItem.routes');
const priceListItemsRoutes = require('./routes/priceListItems.routes');
const departmentRoutes = require('./routes/department.routes');
const pharmaceuticalRoutes = require('./routes/pharmaceuticalStore.routes');
const wardRoutes = require('./routes/ward/ward.routes');
const wardBedRoutes = require('./routes/ward/wardBed.routes');
// const groupPrivilegeRoutes = require('./routes/groupPrivileges.routes');
const drugRoutes = require('./routes/drugs.routes');
const physiotherapyRoutes = require('./routes/physiotherapy.routes');
const insuranceRoutes = require('./routes/insurance/insurance.routes');
const insuranceTypeRoutes = require('./routes/insurance/insuranceType.routes');
const measuringUnitRoutes = require('./routes/measuringUnit.routes');
const itemCategoryRoutes = require('./routes/itemCategory.routes');
const itemRoutes = require('./routes/item.routes');
const supplierRoutes = require('./routes/supplier.routes');
const supplierClassificationRoutes = require('./routes/supplierClassification.routes');
// const patientRoutes = require('./routes/patient.routes');

const outPatientServicesCHRoutes = require('./routes/outpatientServicesChildHealth.routes');
const inPatientCaseTypeRoutes = require('./routes/inPatientCaseTypes.routes');
const hospitalStoreRoutes = require('./routes/hospitalStore.routes');
const maternityAntenatalProfileRoutes = require('./routes/maternity/maternityAntenatalProfile.routes');
const maternityProfileRoutes = require('./routes/maternity/maternityProfile.routes');
const maternityDeliveryRoutes = require('./routes/maternity/maternityDelivery.routes');
const wardTypeRoutes = require('./routes/ward/wardType.routes');

const creditPaymentRoutes = require('./routes/creditPayment.routes');
const companyRoutes = require('./routes/insurance/companyDetails.routes');
const insuranceMedicationMapping = require('./routes/insurance/insuranceMedicationMapping.routes');
const insuranceServiceCostMapping = require('./routes/insurance/insuranceServiceCostMapping.routes');
const personalAccountChargeRoutes = require('./routes/charges/personalAccountCharges.routes');
const ministryDiseasesRoutes = require('./routes/diseaseMinistry.routes');

const app = express();

const PORT = process.env.PORT || 5001;
const corsOption = {
  origin: ['http://localhost:3001'],
};

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));



// enable cors
app.use(cors());

app.use('/item-type', itemTypeRoutes);
app.use('/departments', departmentRoutes);
app.use('/drugs', drugRoutes);
app.use('/pricelists', priceRoutes);
app.use('/subItem', subItemRoutes);
app.use('/price-list-items', priceListItemsRoutes);
app.use('/pharmaceutical', pharmaceuticalRoutes);
app.use('/wards', wardRoutes);
app.use('/ward-beds', wardBedRoutes);

// app.use('/group-privileges', groupPrivilegeRoutes);
app.use('/physiotherapy', physiotherapyRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/measuring-unit', measuringUnitRoutes);
app.use('/item-category', itemCategoryRoutes);
app.use('/items', itemRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/supplier-classification', supplierClassificationRoutes);
// app.use('/patient', patientRoutes);

app.use('/out-patient-services-ch', outPatientServicesCHRoutes);
app.use('/in-patient-case-type', inPatientCaseTypeRoutes);
app.use('/hospital-store', hospitalStoreRoutes);
app.use('/maternity-antenatal-profile', maternityAntenatalProfileRoutes);
app.use('/maternity-profile', maternityProfileRoutes);
app.use('/maternity-deliveries', maternityDeliveryRoutes);
app.use('/ward-types', wardTypeRoutes);
app.use('/credit-payment', creditPaymentRoutes);
app.use('/company', companyRoutes);
// app.use('/medication', medicationRoutes);
// app.use('/medication-category', medicationCategoryRoutes);
// app.use('/medication-purchase', medicinePurchaseRoutes);
// app.use('/medication-stock-take', medicationStockTakeRoutes);
app.use('/insurance-medication-mapping', insuranceMedicationMapping);
app.use('/insurance-types', insuranceTypeRoutes);
app.use('/insurance-service-cost-mapping', insuranceServiceCostMapping);
app.use('/personal-account-charge', personalAccountChargeRoutes);
app.use('/disease-ministry', ministryDiseasesRoutes);

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
