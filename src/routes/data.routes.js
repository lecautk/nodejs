const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/', dataController.getData);
router.get('/get', dataController.crawlData);
router.get('/getData', dataController.getTruyen);

module.exports = router;