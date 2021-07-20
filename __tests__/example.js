
// const app = require('../server/index');
const supertest = require('supertest');

// beforeEach(() => { app = require('../server/index'); });
// afterEach(() => { app.close(); });

// .set('Accept', 'application/json')
// .auth('username', 'password')

// content type (supertest docs)
// content length (same)
// .expect(200) - also test incorrect params for error response code
// maybe response.body.length for results parameter


test('Example', () => {
  expect(1+1).toEqual(2);
});

// test('Supertest', async () => {
//   await supertest(app).get('/products')
//     .then(res => {
//       expect(Array.isArray(res.body)).toBeTruthy();
//     })
// })

// test('Supertest 2', async () => {
//   await supertest(app).get('/products/1')
//     .then(res => {
//       expect(res.text).toEqual('information');
//     })
// })