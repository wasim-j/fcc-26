'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.route('/api/convert')
    .get(function (req, res){
      var convertHandler = new ConvertHandler(req.query.input);
      convertHandler.run();
      let msg = (convertHandler.valid[0]) ? convertHandler.output_obj : {error: convertHandler.valid[1]};
      res.json(msg);
    });
    
};
