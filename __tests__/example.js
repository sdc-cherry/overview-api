
const app = require('../server/index');
const supertest = require('supertest');

// beforeEach(() => { app = require('../server/index'); });
// afterEach(() => { app.close(); });

test('Example', () => {
  expect(1+1).toEqual(2);
});

test('Supertest', async () => {
  await supertest(app).get('/products')
    .then(res => {
      expect(res.text).toEqual('products');
    })
})

test('Supertest 2', async () => {
  await supertest(app).get('/products/1')
    .then(res => {
      expect(res.text).toEqual('information');
    })
})