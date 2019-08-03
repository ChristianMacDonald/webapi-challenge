const express = require('express');
const projectModel = require('./data/helpers/projectModel');
const actionModel = require('./data/helpers/actionModel');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
    projectModel.insert(req.body).then(project => {
        res.status(201).json(project);
    }).catch(error => {
        res.status(500).json({ error: 'There was an error while saving the project to the database.' });
    });
});

router.post('/:id/actions', validateAction, (req, res) => {
    actionModel.insert({ ...req.body, project_id: req.params.id }).then(action => {
        res.status(201).json(action);
    }).catch(error => {
        res.status(500).json({ error: 'There was an error while saving the action to the database.' });
    });
});

router.get('/', (req, res) => {
    projectModel.get().then(projects => {
        res.status(200).json(projects);
    }).catch(error => {
        res.status(500).json({ error: 'The projects information could not be retrieved.' });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    projectModel.getProjectActions(req.params.id).then(actions => {
        res.status(200).json(actions);
    }).catch(error => {
        res.status(500).json({ error: 'The actions information could not be retrieved.' });
    });
});

router.put('/:id', validateProjectId, (req, res) => {
    projectModel.update(req.params.id, req.body).then(project => {
        res.status(200).json(project);
    }).catch(error => {
        res.status(500).json({ error: 'The project information could not be modified.' });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
    projectModel.remove(req.params.id).then(records => {
        res.status(200).json(req.project);
    }).catch(error => {
        res.status(500).json({ error: 'The project could not be removed.'});
    });
});

function validateProjectId(req, res, next) {
    projectModel.get(req.params.id).then(project => {
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
        }
    }).catch(error => {
        res.status(500).json({ error: 'The project information could not be retrieved.' });
    });
}

function validateProject(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            if (req.body.description) {
                next();
            } else {
                res.status(400).json({ message: 'Missing required description field.' });
            }
        } else {
            res.status(400).json({ message: 'Missing required name field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing project data.' });
    }
}

function validateAction(req, res, next) {
    if (req.body) {
        if (req.body.description) {
            if (req.body.notes) {
                next();
            } else {
                res.status(400).json({ message: 'Missing required notes field.' });
            }
        } else {
            res.status(400).json({ message: 'Missing required description field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing action data.' });
    }
}

module.exports = router;