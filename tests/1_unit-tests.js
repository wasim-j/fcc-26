/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');


suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      var expected = 32
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.equal(converthandler.num, expected);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.2L';
      var expected = 3.2
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.equal(converthandler.num, expected);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/2L';
      var expected = 0.5
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.equal(converthandler.num, expected);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '1.2/0.6L';
      var expected = 2;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.equal(converthandler.num, expected);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '5/2.5/1L';
      var expected = NaN;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.isNaN(converthandler.num);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      var expected = 1;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.equal(converthandler.num, expected);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
       
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let converthandler = new ConvertHandler(ele);
        converthandler.run();
        assert.equal(converthandler.unit, ele.toLowerCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = 'egege';
      var expected =  null;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.isNull(converthandler.unit)
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        let converthandler = new ConvertHandler(ele);
        converthandler.run();
        assert.equal(converthandler.unit_return, expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallon','litre','mile','kilometre','pound','kilogram'];
      input.forEach(function(ele, i) {
        let converthandler = new ConvertHandler(ele);
        converthandler.run();
        assert.equal(converthandler.unit_str, expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      
      var input = '5 gal';
      var expected = 18.9271;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.approximately(converthandler.num_return ,expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = '2.5 l';
      var expected = 0.66043;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.approximately(converthandler.num_return ,expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = '6.32mi';
      var expected = 10.17105;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.approximately(converthandler.num_return ,expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = '10.17105 km';
      var expected = 6.32;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.approximately(converthandler.num_return ,expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = '8.4 lbs';
      var expected = 3.81018;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.approximately(converthandler.num_return ,expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = '3.81018 kg';
      var expected = 8.4;
      let converthandler = new ConvertHandler(input);
      converthandler.run();
      assert.approximately(converthandler.num_return ,expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});