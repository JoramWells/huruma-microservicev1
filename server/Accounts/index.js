/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const cpus = require('os').cpus().length;

const sequelize = require('./db/connect');
const accountTypeRoutes = require('./routes/accountType.routes');
const accountingSupplierRoutes = require('./routes/accountingSupplier.routes');
const accountingItemRoutes = require('./routes/accountingItem.routes');
const accountingCostCentre = require('./routes/accountingCostCentre.routes');
const accountingStore = require('./routes/accountingStore.routes');
const accountingDepartment = require('./routes/accountingDepartment.routes');
const accountingJournal = require('./routes/accountingJournal.routes');
const accountingBankAccountRoutes = require('./routes/bank/accountingBankAccounts.routes');
const accountingAccountDetails = require('./routes/accountingAccountDetails.routes');
const accountingAssetCategory = require('./routes/accounting_assets/accountingAssetCategory.routes');
const accountingAssetRoutes = require('./routes/accounting_assets/accountingAsset.routes');
const accountingBankReconciliationRoutes = require('./routes/bank/accountingBankReconciliation.routes');
const accountingAssetLocation = require('./routes/accounting_assets/accountingAssetLocation.routes');
const accountingDocumentRoutes = require('./routes/accountingDocument.routes');
const serviceTypeRoutes = require('./routes/serviceType.routes');
const consultationTypeRoutes = require('./routes/consultation/consultationType.routes');
const consultationTypeGroupRoutes = require('./routes/consultation/consultationTypeGroup.routes');
const consultationTypeSubGroupRoutes = require('./routes/consultation/consultationTypeSubGroup.routes');
const patientAccountRoutes = require('./routes/patientAccount.routes');
const consultationGroupsWithCreditAccountsRoutes = require('./routes/consultation/consultationGroupsWithCreditAccounts.routes');
const cashPaymentModesRoutes = require('./routes/cashPaymentModes.routes');
const invoicePaymentRoutes = require('./routes/invoices/invoicePayment.routes');

const app = express();

const PORT = process.env.PORT || 5013;
const corsOption = {
    origin: ['*'],
};

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // You may choose to respawn the worker here if necessary
    });
} else {
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true,
    }));

    // enable cors
    app.use(cors());

    app.use('/account-type', accountTypeRoutes);
    app.use('/accounting-suppliers', accountingSupplierRoutes);
    app.use('/accounting-department', accountingDepartment);
    app.use('/accounting-items', accountingItemRoutes);
    app.use('/accounting-journal', accountingJournal);
    app.use('/account-details', accountingAccountDetails);
    app.use('/accounting-asset', accountingAssetRoutes);
    app.use('/accounting-bank-accounts', accountingBankAccountRoutes);
    app.use('/account-asset-location', accountingAssetLocation);
    app.use('/account-asset-category', accountingAssetCategory);
    app.use('/accounting-bank-reconciliation', accountingBankReconciliationRoutes);
    app.use('/accounting-documents', accountingDocumentRoutes);
    app.use('/cost-centre', accountingCostCentre);
    app.use('/stores', accountingStore);
    app.use('/service-types', serviceTypeRoutes);
    app.use('/consultation-type', consultationTypeRoutes);
    app.use('/consultation-type-groups', consultationTypeGroupRoutes);
    app.use('/consultation-type-sub-groups', consultationTypeSubGroupRoutes);
    app.use('/consultation-groups-with-credit-accounts', consultationGroupsWithCreditAccountsRoutes);
    app.use('/cash-payment-modes', cashPaymentModesRoutes);
    app.use('/invoice-payments', invoicePaymentRoutes);
    app.use('/patient-accounts', patientAccountRoutes);

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
}
