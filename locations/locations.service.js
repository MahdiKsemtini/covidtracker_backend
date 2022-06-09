const config = require('config.json');
const db = require('_helpers/db');
const Locations = db.Locations;


module.exports = {
    getAll,
    getById,
    create,
    update,
    getByOwner,
    delete: _delete
};

async function getAll() {
    return await Locations.find();
}

async function getByOwner(ownerid){
    return await Locations.find( { owner: { $eq: ownerid } } )
}


async function getById(id) {
    return await Locations.findById(id);
}


async function create(locationsParam) {
    const locations = new Locations(locationsParam);

    await locations.save();
}


async function _delete(id) {
    await Locations.findByIdAndRemove(id);
}

async function update(id, locationsParam) {
    const locations = await Locations.findById(id);
    Object.assign(locations, locationsParam);

    await locations.save();
}