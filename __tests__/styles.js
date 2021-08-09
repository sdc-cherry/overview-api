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

test('Valid request for product 999999 should return three style objects. Final object should have four photos and six SKUs',  () => {
  return supertest(app).get('/products/999999/styles')
  .then(res => {
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(typeof(res.body[0]["skus"])).toEqual('object');
    expect(Array.isArray(res.body[0]["photos"])).toBeTruthy();
    expect(res.body.length).toEqual(3);
    expect(res.body[2]["photos"].length).toEqual(4);
    expect(Object.keys(res.body[2]["skus"]).length).toEqual(6);
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
