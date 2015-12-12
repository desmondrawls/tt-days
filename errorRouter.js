var express = require('express')
var helpers = require('./helpers')

var router = express.Router({
    mergeParams: true
})

router.use(function (req, res, next) {
    console.log('---------------')
    console.log('handling error')
    console.log('---------------')
    next()
})

router.get('/', function(req, res){
    res.status(404).send('These are not the days you are looking for')
})

router.get('/:id', function(req, res){
    res.status(404).send('No day with id ' + req.params.id + ' found')
})

module.exports = router