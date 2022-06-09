const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    checkin: { type: String, required: true },
    checkout: { type: String, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Locations'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});



module.exports = mongoose.model('Checkin', schema);