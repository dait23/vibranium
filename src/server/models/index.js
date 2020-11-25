const { esclient, index, type } = require("../../elastic");

async function getQuotes(req) {

  const query = {
    query: {
      // match: {
      //   title: {
      //     query: req.title,
      //     operator: "and",
      //     fuzziness: "auto"
      //   }
      // }

      multi_match: {
        query:    req.title,
        fields: [ "title", "created_by" ],
        operator: "and",
        fuzziness: "auto" 
      }
    }
  }

  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index, 
    type:  type,
    body:  query
  }); 

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      title:  hit._source.title,
      address: hit._source.address,
      phone: hit._source.phone,
      image_url:hit._source.image_url,
      image_name:hit._source.image_name,
      created_by:hit._source.created_by,
      score:  hit._score
    }
  });

  return {
    results,
    values
  }

}

async function insertNewQuote(quote, author) {
  return esclient.index({
    index,
    type,
    body: {
      quote,
      author
    }
  })
}

module.exports = {
  getQuotes,
  insertNewQuote
}