var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SleepSchema = new Schema({
    schedule: [

    ],
    stats: [

    ]
});

module.exports = mongoose.model('Sleep', SleepSchema);
