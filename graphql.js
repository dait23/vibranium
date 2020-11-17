import http from "k6/http";
import { check, group, sleep, fail } from 'k6';

export let options = {

  duration: '1m',

  thresholds: {

    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s

  },

};

export default function() {

  let query = `
    query MyQuery {
  article {
    author_id
    body
    id
    title
  }
}

    }`;

  let headers = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret":"admin123"
  };

  let res = http.post("http://125.208.135.53:30379/v1/graphql",
    JSON.stringify({ query: query }),
    {headers: headers}
  );

  sleep(0.3);
}
