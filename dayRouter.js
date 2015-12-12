var express = require('express')
var helpers = require('./helpers')
var jsonTransformer = require('./collection_json/transformer')
var jsonTranslater = require('./collection_json/translater')


var router = express.Router({
    mergeParams: true
})

var Day = require('./db').Day

router.use(function (req, res, next) {
    console.log('---------------')
    console.log(req.method, 'for day ', req.params.id, ' at ' + req.path)
    console.log('---------------')
    next()
})

router.get('/', helpers.verifyDay, function (req, res) {
    Day.findById(req.params.id, function (err, day) {
        respondWithDay(res, day)
    })
})

router.put('/', function (req, res) {
    console.log("updating with ", req.body)
    var day = jsonTranslater.dayFromTemplateObject(req.body)
    Day.findByIdAndUpdate(req.params.id, day, {new: true}, function (err, day) {
        //THIS IS THE OLD DAY NOT THE UPDATED ONE
        respondWithDay(res, day)
    })
})

router.delete('/', helpers.verifyDay, function (req, res) {
    Day.findByIdAndRemove(req.params.id, function (err, day) {
        res.sendStatus(200)
    })
})

function respondWithDay(res, day) {
    res.format({
        html: function () {
            res.render('show', {day: day})
        },
        json: function () {
            res.send(JSON.stringify(jsonTransformer.layout('http://localhost:3001/' + day.id, jsonTransformer.days([day]))))
        }
    })
}

module.exports = router


