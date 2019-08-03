const express = require('express');
const projectModel = require('./data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    projectModel.get().then(projects => {
        res.status(200).json(projects);
    }).catch(error => {
        res.status(500).json({ error: 'The projects information could not be retrieved.' });
    });
});

module.exports = router;