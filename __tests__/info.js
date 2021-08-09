// TESTING FILE FOR /products/:id ENDPOINT (PRODUCT INFO)

const app = require('../server/app');
const supertest = require('supertest');


test('Valid request for product 1000010 should return an object with 4 features',  () => {
  return supertest(app).get('/products/1000010')
  .then(res => {
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body["features"])).toBeTruthy();
    expect(res.body["features"].length).toEqual(4);
  });
});

test('Should return a status of 502 for nonexistent product ID', () => {
  return supertest(app).get('/products/1000012')
    .then(res => {
      expect(res.status).toEqual(502);
    })
})