const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    dateTest: { type: Date, required: true, default: mongoose.now },
    dateReclamation: { type: Date, required: true, default: mongoose.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});



module.exports = mongoose.model('Reclamation', schema);