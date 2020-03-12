const express = require('express');
const NewsController = require('../src/controllers/v1.0/newsController');
const News = require('../src/models/news/model');
const NewsRepository = require('../src/models/news');

const newsController = new NewsController(new NewsRepository(News));
const router = express.Router();

router.get('/', newsController.index);
router.post('/', newsController.save);

module.exports = router;
