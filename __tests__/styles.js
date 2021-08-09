// TESTING FILE FOR /products/:id ENDPOINT (PRODUCT INFO)

const app = require('../server/app');
const supertest = require('supertest');


test('Valid product id request should return ...',  () => {
  return supertest(app).get('/products/2/styles')
  .then(res => {
    expect(res.status).toEqual(200);
    expect(res.body).toBe(
      expect.objectContaining({
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "category": "Jackets", "default_price": 140,
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "features": [{"feature": "Fabric", "value": "Canvas"}, {"feature": "Buttons", "value": "Brass"}]
      })
    );
  });
});