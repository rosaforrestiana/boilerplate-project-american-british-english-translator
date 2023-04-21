const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
   suite('Post to api/translate',()=>{
     test('Translation with text and locale fields',(done)=>{
        const str = 'Mangoes are my favorite fruit';
        const language ="american-to-british";
        const change = 'Mangoes are my <span class="highlight">favourite</span> fruit';
        chai.request(server)
        .post('/api/translate')
        .send({text:str,locale:language})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json')
          assert.equal(res.body.translation,change)
          done();
        })
     })

     test('Translation with text and invalid locale field',(done)=>{
        const str = "We had a party at my friend's condo.";
        const language = "american-to-german";
        const change = {error:'Invalid value for locale field'};
        chai.request(server)
        .post('/api/translate')
        .send({text:str,locale:language})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json')
          assert.deepEqual(res.body,change)
          done();
        })
     })

     test('Translation with missing text field',(done)=>{
        const str = undefined;
        const language = "american-to-british";
        const change = {error:'Required field(s) missing'};
        chai.request(server)
        .post('/api/translate')
        .send({text:str,locale:language})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json')
          assert.deepEqual(res.body,change)
          done();
        })
     })
     
     test('Translation with missing locale field',(done)=>{
        const str = "We had a party at my friend's condo.";
        const language = undefined;
        const change = {error:'Required field(s) missing'};
        chai.request(server)
        .post('/api/translate')
        .send({text:str,locale:language})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json')
          assert.deepEqual(res.body,change)
          done();
        })
     })

     test('Translation with empty text',(done)=>{
        const str = "";
        const language = "american-to-british";
        const change = {error:'No text to translate'};
        chai.request(server)
        .post('/api/translate')
        .send({text:str,locale:language})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json')
          assert.deepEqual(res.body,change)
          done();
        })
     })

      test('Translation with text that needs no translation',(done)=>{
        const str = "digger";
        const language = "american-to-british";
        const change = 'Everything looks good to me!';
        chai.request(server)
        .post('/api/translate')
        .send({text:str,locale:language})
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.equal(res.type,'application/json')
          assert.strictEqual(res.body.translation,change)
          done();
        })
     })
   })
});

  after(function() {
  chai.request(server)
    .get('/')
  });
        
