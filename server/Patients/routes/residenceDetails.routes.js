const express = require('express');
const { addResidenceDetails, getAllResidenceDetails } = require('../controllers/residenceDetails.controller');

const router = express.Router();

router.post('/add', addResidenceDetails);
router.get('/fetchAll', getAllResidenceDetails);
router.get('/detail/:id', getAllResidenceDetails);
// router.put('/edit/:id', editResidence);
// router.delete('/delete/:id', deleteResi);

module.exports = router;
