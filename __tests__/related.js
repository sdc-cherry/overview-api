const app = require('../server/app');
const supertest = require('supertest');

test('Valid request for related products should return an array', () => {
   return supertest(app).get('/products/5/related')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    })
})

test('Valid request for product 999990 should return 5 related products', () => {
   return supertest(app).get('/products/999990/related')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toEqual(5);
    })
})
