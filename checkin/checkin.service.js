const config = require('config.json');
const db = require('_helpers/db');
const Checkin = db.Checkin;


module.exports = {
    getAll,
    getById,
    create,
    getByOwner,
    getByLocation,
    delete: _delete
};

async function getAll() {
    return await Checkin.find();
}



async function getByOwner(ownerid){
    return await Checkin.find( { user: { $eq: ownerid } } )
}


async function getByLocation(locid){
    return await Checkin.find( { location: { $eq: locid } } )
}

async function getById(id) {
    return await Checkin.findById(id);
}


async function create(checkinParam) {
    const checkin = new Checkin(checkinParam);

    await checkin.save();
}


async function _delete(id) {
    await Checkin.findByIdAndRemove(id);
}