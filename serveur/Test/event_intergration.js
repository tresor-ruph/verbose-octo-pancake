let should = require('should')
let chai = require('chai')
let request = require('request')
let expect = chai.expect

describe('events api test', () => {

    it("it should return a list of events",function(done){
        request.get(
          {
            url : 'http://localhost:8000/api/getEvent/1d2925b0-383f-4753-a102-b0963d067dad'
          },
          function(error, response, body){
    
            var _body = {};
            console.log('booooooooody')
            console.log(body)
            try{
              _body = JSON.parse(body);
            }
            catch(e){
                console.log(e)
              _body = {};
            }
            expect(_body.length >= 0)
            expect(response.statusCode).to.equal(404);
            
    
            done(); 
          }
        );
      });

      it("Event test should fail",function(done){
        request.get(
          {
            url : 'http://localhost:8000/api/getEvent/1d2925b0-383f-4753-a102'
          },
          function(error, response, body){
    
            var _body = {};
            try{
              _body = JSON.parse(body);
            }
            catch(e){
                console.log(e)
              _body = {};
            }
    
            expect(response.statusCode).to.equal(404);
            done(); 
          }
        );
      });
})
