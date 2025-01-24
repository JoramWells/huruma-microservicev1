/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const cpus = require('os').cpus().length;

const sequelize = require('./db/connect');
const procedureGroupRoutes = require('./routes/procedure/procedureGroup.routes');
const procedureDetailsRoutes = require('./routes/procedure/procedureDetails.routes');
const procedureItemsRoutes = require('./routes/procedure/procedureItems.routes');
const procedureRoutes = require('./routes/procedure/procedure.routes');
const diseaseRoutes = require('./routes/diseases/disease.routes');
const diseaseDuplicatesRoutes = require('./routes/diseases/diseaseDuplicates.routes');
const diseaseMinistryRoutes = require('./routes/diseases/diseaseMinistry.routes');
const internalPharmacyRequestRoutes = require('./routes/internalPharmacyRequest.routes');
const doctorNotesRoutes = require('./routes/doctor/doctorNotesRoutes.routes');

const internalLabRequestRoutes = require('./routes/_lab/internalLabRequest.routes');
const aLabRoutes = require('./routes/_lab/aLab.routes');
const labTestSummarySubSectionRoutes = require('./routes/_lab/labTestSummarySubSection.routes');
const specimenTypeRoutes = require('./routes/_lab/specimenType.routes');

const clusterMiddleware = require('./middleware/clusterMiddleware');

const app = express();

const PORT = process.env.PORT || 5000;
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

    app.use('/internal-lab-requests', internalLabRequestRoutes);
    app.use('/lab', aLabRoutes);
    app.use('/lab-tests-summary-sub-section', labTestSummarySubSectionRoutes);
    app.use('/specimen-type', specimenTypeRoutes);

    app.use('/procedure', procedureRoutes);
    app.use('/procedure-group', procedureGroupRoutes);
    app.use('/procedure-details', procedureDetailsRoutes);
    app.use('/procedure-items', procedureItemsRoutes);

    app.use('/disease', diseaseRoutes);
    app.use('/disease-ministry', diseaseMinistryRoutes);
    app.use('/diseases-duplicates', diseaseDuplicatesRoutes);

    app.use('/internal-pharmacy-request', internalPharmacyRequestRoutes);
    app.use('/doctor-notes', doctorNotesRoutes);

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
