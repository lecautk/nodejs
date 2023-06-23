const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');
// const detailController = require('../controllers/detail.controller');

router.get('/', dataController.getDetail);
router.get('/chapter', dataController.getDetailChapter);
router.get('/get', dataController.crawlData);
// router.get('/getStoryDetail', detailController.getStoryDetail);
// router.get('/getDetail', detailController.getDetail);



module.exports = router;