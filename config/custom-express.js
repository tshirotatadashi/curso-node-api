const express = require('express')
const expressValidator = require('express-validator')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = function(){
  var app = express()
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(expressValidator())

  consign()
   .include('controllers')
   .then('persistencia')
   .into(app)

  return app
}