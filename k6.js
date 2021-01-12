import http from "k6/http";
import { sleep } from "k6";

import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

faker.locale = "id_ID";

export let options = {

  vus: 50, // 1 user looping for 1 minute

  duration: '1m',

  thresholds: {

    http_req_duration: ['p(92)<1800'], // 99% of requests must complete below 1.8s

  },

};

export default function() {


  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post("http://admin:password@xxx:5984/design_photos",

    JSON.stringify({ 

      "date": faker.date.recent(),
      "code": "AM"+faker.random.number(),
      "store": "Alfamart Jl."+faker.address.state(),
      "category_store": "Minimarket",
      "chain": "Alfamart",
      "dso": "Jakarta Timur",
      "category_items": "Cigarette",
      "title": "After",
      "description": "foto After",
      "urlImage": faker.image.imageUrl(),
      "note": "null",
      "users": faker.name.firstName()+" "+faker.name.lastName()


  }),
    {headers: headers}
  );

  sleep(0.3);
}
