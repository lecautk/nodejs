const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/', dataController.getData);
router.post('/get', dataController.crawlData);
router.post('/getData', dataController.getTruyen);

module.exports = router;