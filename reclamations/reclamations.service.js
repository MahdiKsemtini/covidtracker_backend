const config = require('config.json');
const db = require('_helpers/db');
const Reclamation = db.Reclamation;
const Locations = db.Locations;
const User = db.User;
const Checkin = db.Checkin;
const nodemailer = require('nodemailer');
const checkinService = require('../checkin/checkin.service');
const locationsService = require('../locations/locations.service');
const userService = require('../users/user.service');


module.exports = {
    getAll,
    getById,
    create,
    getByOwner,
    sendCreationMail,
    delete: _delete
};

async function getAll() {
    return await Reclamation.find();
}

async function getByOwner(ownerid){
    const reclamation = await Reclamation.find( { user: { $eq: ownerid } } )
    return reclamation
    
}

async function getById(id) {
    return await Reclamation.findById(id);
}


async function create(reclamationParam) {
    const reclamation = new Reclamation(reclamationParam);

    await reclamation.save();

    const userCheckins = await checkinService.getByOwner(reclamation.user);
    console.log(userCheckins);

    for (const checkin of userCheckins) {
        const others = await checkinService.getByLocation(checkin.location);
        console.log(others);

        for (const other of others){
            const user = await userService.getById(other.user);
            console.log (user);

                await sendCreationMail(user.email);
                console.log(user.email);
            

        };

    };
}


async function _delete(id) {
    await Reclamation.findByIdAndRemove(id);
}

function sendCreationMail(tomail){
        
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'covid.tracker.tn@gmail.com',
                      pass: 'Ch7aymaa'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                  });
                  
                  var mailOptions = {
                    from: 'covid.tracker.tn@gmail.com',
                    to: tomail,
                    subject: 'Covid-19 Tracker TN',
                    text: 'you may have been in contact with someone covid+ . so please check yourself.'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

}