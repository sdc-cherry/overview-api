import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 1 }
    // { duration: '1m30s', target: 10 },
    // { duration: '20s', target: 0 },
  ],
};

export default function () {
  http.get('http://localhost:3000/products');
}