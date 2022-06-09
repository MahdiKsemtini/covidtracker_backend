const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    categorie: { type: String, required: true },
    capacity: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    latitude: { type: Number,required: true},
    longitude: { type: Number,required: true}
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});



module.exports = mongoose.model('Locations', schema);