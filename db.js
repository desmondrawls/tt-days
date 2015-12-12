var uri = 'mongodb://localhost:27017/test'

var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
    console.log('db connected')
})

var daySchema = mongoose.Schema({
    date: String,
    host: String,
    conflict: Boolean,
    speaker_id: String
})
exports.Day = mongoose.model('Day', daySchema)