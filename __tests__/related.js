const app = require('../server/app');
const supertest = require('supertest');

test('Valid request for related products should return an array', () => {
   return supertest(app).get('/products')
    .then(res => {
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    })
})
