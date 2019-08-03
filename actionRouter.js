const express = require('express');
const actionModel = require('./data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    actionModel.get().then(actions => {
        res.status(200).json(actions);
    }).catch(error => {
        res.status(500).json({ error: 'The actions information could not be retrieved.' });
    });
});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

router.put('/:id', validateActionId, (req, res) => {
    actionModel.update(req.params.id, req.body).then(action => {
        res.status(200).json(action);
    }).catch(error => {
        res.status(500).json({ error: 'The action information could not be modified.' });
    });
});

router.delete('/:id', validateActionId, (req, res) => {
    actionModel.remove(req.params.id).then(records => {
        res.status(200).json(req.action);
    }).catch(error => {
        res.status(500).json({ error: 'The action could not be removed.' });
    });
});

function validateActionId(req, res, next) {
    actionModel.get(req.params.id).then(action => {
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: 'The action with the specified ID does not exist.' });
        }
    }).catch(error => {
        res.status(500).json({ error: 'The project information could not be retrieved.' });
    });
}

module.exports = router;