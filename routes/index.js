const express = require('express');
const DataController = require("../controllers/DataController");

const router = express.Router();

router.get('/process/:id', DataController.updateNotionData);

module.exports = router;