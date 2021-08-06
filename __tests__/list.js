// TESTING FILE FOR /products ENDPOINT (LIST OF PRODUCTS)

const app = require('../server/app');
const supertest = require('supertest');

// beforeEach(() => { app = require('../server/index'); });
// afterEach(() => { app.close(); });
// .set('Accept', 'application/json')
// .auth('username', 'password')
// content type (supertest docs)
// content length (same)

test('Valid request with no parameters should return array of 5 product objects', () => {
   return supertest(app).get('/products')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(5);
    })
})

test('Valid request with parameters should return array of N product objects',  () => {
   return supertest(app).get('/products?page=2&count=8')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(16);
    })
})

test('Request with invalid parameters should return an error of 400',  () => {
   return supertest(app).get('/products?pag=2&count=8')
    .then(res => {
      expect(res.status).toEqual(400);
    })
})

test('Request with with invalid connection parameters should return an error of 502',  () => {
  return supertest(app).get('/product').auth('what','no')
   .then(res => {
     expect(res.status).toEqual(404);
   })
})


