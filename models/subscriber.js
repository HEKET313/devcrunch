let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

let Schema = mongoose.Schema;
let SubscriberModelSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

SubscriberModelSchema.plugin(autoIncrement.plugin, 'SubscriberModel');
module.exports = mongoose.model('SubscriberModel', SubscriberModelSchema);