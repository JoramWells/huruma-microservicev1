/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const cpus = require('os').cpus().length;

const sequelize = require('./db/connect');
const payrollDeductionsRoutes = require('./routes/payrollDeductions.routes');
const payrollEarningsRoutes = require('./routes/payrollEarnings.routes');
const payrollEmployeeRecordsRoutes = require('./routes/payrollEmployeeRecords.routes');
const payrollJobTitleRoutes = require('./routes/payrollJobTitle.routes');
const payrollEmployeeCategoryRoutes = require('./routes/payrollEmployeeCategory.routes');
const payrollPayTypeRoutes = require('./routes/payrollPayType.routes');
const payrollEmployeeBenefitsFileRoutes = require('./routes/payrollEmployeeBenefitFile.routes');
const payrollEmployeeDeductionsRoutes = require('./routes/payrollEmployeeDeductions.routes');
const payrollPeriodsRoutes = require('./routes/payrollPeriods.routes');
const payrollMonthlyDeductionsRoutes = require('./routes/payrollMonthlyDeductions.routes');
const payrollEmployeeLoanRecordsRoutes = require('./routes/payrollEmployeeLoanRecords.routes');
const payrollTaxCategories = require('./routes/payrollTaxCategories.routes');
const payrollTaxStatus = require('./routes/payrollTaxStatus.routes');
const payrollPeriodEmployeePayCalculationsRoutes = require('./routes/payrollPeriodEmployeePayCalculations.routes');
const payrollEmployeeMonthlyDeductionFilesRoutes = require('./routes/payrollEmployeeMonthlyDeductionFiles.routes');
const payrollEmployeeLoanDeductionRoutes = require('./routes/payrollEmployeeLoanDeduction.routes');
const taxFileRoutes = require('./routes/payrollEmployeeTaxFile.routes');


const app = express();

const PORT = process.env.PORT || 5014;
const corsOption = {
  origin: ['http://localhost:3000'],
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

  app.use('/payroll-deductions', payrollDeductionsRoutes);
  app.use('/payroll-earnings', payrollEarningsRoutes);
  app.use('/payroll-employee-records', payrollEmployeeRecordsRoutes);
  app.use('/payroll-job-title', payrollJobTitleRoutes);
  app.use('/payroll-employee-category', payrollEmployeeCategoryRoutes);
  app.use('/payroll-pay-type', payrollPayTypeRoutes);
  app.use('/payroll-employee-benefits-file', payrollEmployeeBenefitsFileRoutes);
  app.use('/payroll-employee-deductions', payrollEmployeeDeductionsRoutes);
  app.use('/payroll-periods', payrollPeriodsRoutes);
  app.use('/payroll-monthly-deductions', payrollMonthlyDeductionsRoutes);
  app.use('/payroll-loan-records', payrollEmployeeLoanRecordsRoutes);
  app.use('/payroll-tax-categories', payrollTaxCategories);
  app.use('/payroll-tax-status', payrollTaxStatus);
  app.use('/payroll-employee-pay-calculations', payrollPeriodEmployeePayCalculationsRoutes);
  app.use('/payroll-employee-monthly-deductions-file', payrollEmployeeMonthlyDeductionFilesRoutes);
  app.use('/payroll-employee-loan-deductions', payrollEmployeeLoanDeductionRoutes);
  app.use('/payroll-tax-files', taxFileRoutes);
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
