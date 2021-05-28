let should = require('should')
let chai = require('chai')
let request = require('request')
let expect = chai.expect

describe('users api test', () => {

    it("it should return all users",function(done){
        request.get(
          {
            url : 'http://localhost:8000/api/allusers'
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
            expect(_body.length >= 0)
            expect(response.statusCode).to.equal(200);
            if( _body[0].should.have.property('Accountstatus') ){
                console.log('yes')
              expect(_body[0]. Accountstatus).to.have.lengthOf.at.least(3);
            }
    
            done(); 
          }
        );
      });

      it("it should return a single user",function(done){
        request.get(
          {
            url : 'http://localhost:8000/api/user/Tresor Tekadam'
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
            expect(_body.length >= 0)
            expect(response).to.be.an('object')
            expect(_body).to.be.an('array')
            expect(response.statusCode).to.equal(200);
            done(); 
          }
        );
      });
      it("user test should return 404",function(done){
        request.get(
          {
            url : 'http://localhost:8000/api/user/xxx'
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
