const express = require('express');
const { getTestConnection } = require('../controllers/test.controller');

const router = express.Router();

router.get('/', getTestConnection);

module.exports = router;
