const express = require('express');
const { addRadiologyRequest, getAllRadiologyRequests, getRadiologyRequestDetail, searchRadiology } = require('../../controllers/radiology/internalRadiologyRequests.controller');


const router = express.Router();

router.post('/add', addRadiologyRequest);
router.get('/fetchAll', getAllRadiologyRequests);
router.get('/search', searchRadiology);
router.get('/detail/:id', getRadiologyRequestDetail);
// router.put('/edit', eit);

module.exports = router;
