// TESTING FILE FOR /products/:id ENDPOINT (PRODUCT INFO)

const app = require('../server/app');
const supertest = require('supertest');


test('Valid request for product with photos, skus should return arrays for those properties',  () => {
  return supertest(app).get('/products/1/styles')
  .then(res => {
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(typeof(res.body[0]["skus"])).toEqual('object');
    expect(Array.isArray(res.body[0]["photos"])).toBeTruthy();
    // ADD length (or more specific tests) HERE
  });
});

// No photos or skus
test('Valid request for product with no photos, skus should return empty arrays for those properties',  () => {
  return supertest(app).get('/products/2/styles')
  .then(res => {
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(typeof(res.body[0]["skus"])).toEqual('object');
    expect(Array.isArray(res.body[0]["photos"])).toBeTruthy();
  });
});
