var Day = require('./db').Day

function verifyDay(req, res, next) {
    next()
}

exports.verifyDay = verifyDay