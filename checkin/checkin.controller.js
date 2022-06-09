const express = require('express');
const { Checkin } = require('../_helpers/db');
const router = express.Router();
const checkinService = require('./checkin.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/owner/:user', getByOwner);
router.delete('/:id', _delete);

module.exports = router;


function create(req, res, next) {
    checkinService.create(req.body)
        .then(checkin => checkin ? res.json(checkin): res.status(200).json({ message: 'check in success' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    checkinService.getAll()
        .then(checkin => res.json(checkin))
        .catch(err => next(err));
}

function getById(req, res, next) {
    checkinService.getById(req.params.id)
        .then(checkin => checkin ? res.json(checkin) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByOwner(req, res , next){
    checkinService.getByOwner(req.params.user)
        .then(checkin => checkin ? res.json(checkin) : res.sendStatus(404))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    checkinService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}