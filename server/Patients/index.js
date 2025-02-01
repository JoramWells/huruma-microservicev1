/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');

const cluster = require('cluster');
const cpus = require('os').cpus().length;
const patientRoutes = require('./routes/patient.routes');
const peopleRelationRoutes = require('./routes/peopleRelations.routes');
const personalAccountChargeRoutes = require('./routes/charges/personalAccountCharges.routes');
const personalChargesPaymentRoutes = require('./routes/charges/personalChargesPayment.routes');
const hospitalRoutes = require('./routes/hospital/hospital.routes');
const sequelize = require('./db/connect');

const userRoutes = require('./routes/user/user.routes');
const userPrivilegeRoutes = require('./routes/user/userPrivilege.routes');
const userTypeRoutes = require('./routes/user/userType.routes');
const userPrivilegeDetailRoutes = require('./routes/user/userPrivilegeDetail.routes');

const app = express();

const PORT = process.env.PORT || 5003;
const corsOption = {
  origin: ['http://localhost:3000', 'https://www.otzplus.xyz', 'http://localhost:3001'],
};

app.use(cors(corsOption));

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

  app.use('/patient', patientRoutes);
  app.use('/people-relations', peopleRelationRoutes);
  app.use('/personal-account-charge', personalAccountChargeRoutes);
  app.use('/personal-charges-payment', personalChargesPaymentRoutes);
  app.use('/hospital', hospitalRoutes);

  app.use('/users', userRoutes);
  app.use('/user-privileges', userPrivilegeRoutes);
  app.use('/user-type', userTypeRoutes);
  app.use('/user-privilege-details', userPrivilegeDetailRoutes);

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
