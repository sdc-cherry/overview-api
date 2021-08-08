import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100
    }
  }
};

export default function () {
  http.get('http://localhost:3000/products/999775/styles');
}