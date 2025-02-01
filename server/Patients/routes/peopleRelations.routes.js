const express = require('express');
const {
  addPeopleRelations, getAllPeopleRelations,
  getPeopleRelationDetail, editPeopleRelation, deletePeopleRelation,
} = require('../controllers/peopleRelations.controller');

const router = express.Router();

router.post('/add', addPeopleRelations);
router.get('/fetchAll', getAllPeopleRelations);
router.get('/detail/:id', getPeopleRelationDetail);
router.put('/edit/:id', editPeopleRelation);
router.delete('/delete/:id', deletePeopleRelation);

module.exports = router;
