const app = require('../server/app');
const supertest = require('supertest');


test('Valid product id request should return ...',  () => {
  return supertest(app).get('/products/1')
  .then(res => {
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('information');
  })
})