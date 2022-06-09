const express = require('express');
const { Reclamation, User } = require('../_helpers/db');
const router = express.Router();
const nodemailer = require('nodemailer');
const reclamationService = require('./reclamations.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/owner/:user', getByOwner);
router.delete('/:id', _delete);

module.exports = router;


function create(req, res, next) {
    reclamationService.create(req.body)
        .then(reclamation => reclamation ? res.json(reclamation): res.status(200).json({ message: 'reclamation success' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    reclamationService.getAll()
        .then(reclamation => res.json(reclamation))
        .catch(err => next(err));
}

function getById(req, res, next) {
    reclamationService.getById(req.params.id)
        .then(reclamation => reclamation ? res.json(reclamation) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByOwner(req, res , next){
    reclamationService.getByOwner(req.params.user)
        .then(reclamation => reclamation ? res.json(reclamation) : res.sendStatus(404))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    reclamationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

router.post('/sendmail/:mail', async (req, res) => {
        var tomail = req.params.mail
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'covid.tracker.tn@gmail.com',
              pass: 'esprit2122'
            },
            tls: {
                rejectUnauthorized: false
            }
          });
          
          var mailOptions = {
            from: 'covid.tracker.tn@gmail.com',
            to: tomail,
            subject: 'Covid-19 Tracker TN',
            text: 'One of your customers tested positive for covid-19.\n Please take your precautions.'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    
})