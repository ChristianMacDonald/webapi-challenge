const express = require('express');

const router = express.Router();

const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

router.use('/projects', projectRouter);
router.use('/actions', actionRouter);

module.exports = router;