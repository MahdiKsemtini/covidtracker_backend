const express = require('express');
const router = express.Router();
const locationsService = require('./locations.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/owner/:owner', getByOwner);
router.delete('/:id', _delete);
router.put('/:id', update);

module.exports = router;


function create(req, res, next) {
    locationsService.create(req.body)
        .then(locations => locations ? res.json(locations): res.status(200).json({ message: 'location added successfully' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    locationsService.getAll()
        .then(locations => res.json(locations))
        .catch(err => next(err));
}

function getById(req, res, next) {
    locationsService.getById(req.params.id)
        .then(locations => locations ? res.json(locations) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByOwner(req, res , next){
    locationsService.getByOwner(req.params.owner)
        .then(locations => locations ? res.json(locations) : res.sendStatus(404))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    locationsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    locationsService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}