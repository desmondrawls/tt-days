var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var helpers = require('./helpers')

app.set('views', './views')
app.set('view engine', 'jade')
app.use(morgan('combined'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/stylesheets', express.static('stylesheets'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var errorRouter = require('./errorRouter')
app.use('/error/', errorRouter)

var dayRouter = require('./dayRouter')
app.use('/:id', dayRouter)

var daysCollectionRouter = require('./daysCollectionRouter')
app.use('/', daysCollectionRouter)

var server = app.listen(3001, function(){
    console.log('Days server running at http://localhost:' + server.address().port)
})

