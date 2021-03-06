import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 1,
      maxVUs: 10
    }
  }
};

export default function () {
  http.get('http://localhost:3000/products');
}