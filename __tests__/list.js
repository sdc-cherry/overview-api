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

test('Valid request with parameters should return array of product objects with length equal to count',  () => {
   return supertest(app).get('/products?page=2&count=8')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(8);
    })
})

test('Request for second-to-last page should return 10 products',  () => {
   return supertest(app).get('/products?page=100001&count=10')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(10);
    })
})

test('Request for incomplete (final) page should still return any existing products',  () => {
   return supertest(app).get('/products?page=100002&count=10')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(1);
    })
})

test('Request with invalid parameters should return an error of 400',  () => {
   return supertest(app).get('/products?pag=2&count=8')
    .then(res => {
      expect(res.status).toEqual(400);
    })
})

test('Request with invalid connection parameters should return an error of 404',  () => {
  return supertest(app).get('/product').auth('what','no')
   .then(res => {
     expect(res.status).toEqual(404);
   })
})

