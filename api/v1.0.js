const express = require('express');
const Controller = require('../src/controllers/v1.0/newsController');
const News = require('../src/repositories/news/model');
const Repository = require('../src/repositories/news');
const config = require('../config');
const validate = require('../src/validators/index')('v1');

const repository = new Repository(config, News);
const controller = new Controller(repository);
const router = express.Router();

router.get('/', controller.getAll.bind(controller));
router.post('/', validate('save').bind(validate), controller.save.bind(controller));

module.exports = router;
