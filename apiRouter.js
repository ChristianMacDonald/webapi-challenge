const express = require('express');

const router = express.Router();

const projectRouter = require('./projectRouter');

router.use('/projects', projectRouter);

module.exports = router;