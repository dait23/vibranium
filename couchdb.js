import http from "k6/http";
import { sleep } from "k6";


export let options = {

  vus: 1, // 1 user looping for 1 minute

  duration: '1m',

  thresholds: {

    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s

  },

};

export default function() {

  let query = {


  "toko":"ALFAMART P.JAYAKARTA EGegory11",
  "dso": "Jakarta Timur",
  "category_store": "MMC",
  "chain_store": "Alfamart",
  "type_store": "Minimarket",
  "category_product":"cigarettes",
  "product": "Black 16",
  "description": "Djarum Black Isi 16",
  "barcode":"12345678",
  "survey_harga": "16200",
  "stock": "7",
  "satuan": "pcs",
  "expired": null,
  "expired_2": null,
  "expired_3": null,
  "barcode": null,
  "barcode2": null,
  "barcode3": null,
  "expired_qty": "0",
  "suggest_order": null,
  "created_by": "RAJA NABASAR PURBA",
  "created_at": "2019-08-12 14:25:02"



};

  let headers = {
    "Content-Type": "application/json",
  };

  let res = http.post("http://admin:couchdb@192.168.1.81:5984/stock_report",
    JSON.stringify({ query: query }),
    {headers: headers}
  );

  sleep(0.3);
}
