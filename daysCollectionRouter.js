var express = require('express')
var helpers = require('./helpers')
var jsonTemplates = require('./collection_json/transformer')
var jsonTranslater = require('./collection_json/translater')

var router = express.Router({
    mergeParams: true
})

var Day = require('./db').Day

router.use(function (req, res, next) {
    console.log('---------------')
    console.log(req.method, ' for days collection', ' with', req.body)
    console.log('---------------')
    next()
})

router.get('/', function(req, res){
    Day.find({}, function(err, days){
        respondWithDays(res, days)
    })
})

router.post('/', function(req, res){
    console.log("creating new day with ", req.body)
    var day = jsonTranslater.dayFromTemplateObject(req.body)
    new Day(day).save()
    respondWithRedirect(res, '/')
})

function respondWithRedirect(res, path) {
    res.format({
        html: function() {
            res.redirect('/')
        },
        json: function() {
            res.status(201).send("")
        }
    })
}

function respondWithDays(res, days) {
    res.format({
        html: function () {
            res.render('index', {days: days})
        },
        json: function () {
            res.json(jsonTemplates.layout('http://localhost:3000/', jsonTemplates.days(days)))
        }
    })
}

module.exports = router