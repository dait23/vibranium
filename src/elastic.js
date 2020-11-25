const { Client } = require("@elastic/elasticsearch");
                   require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://125.208.135.53:30315";
const esclient   = new Client({ node: elasticUrl });
const index      = "store";
const type       = "_doc";

/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */

// async function createIndex(index) {
//   try {

//     await esclient.indices.create({ index });
//     console.log(`Created index ${index}`);

//   } catch (err) {

//     console.error(`An error occurred while creating the index ${index}:`);
//     console.error(err);

//   }
// }

/**
 * @function setQuotesMapping,
 * @returns {void}
 * @description Sets the quotes mapping to the database.
 */

async function setQuotesMapping () {
  try {
    const schema = {
      title: {
        type: "text" 
      },
      address: {
        type: "text"
      },
      created_by: {
        type: "text"
      }
    };
  
    await esclient.indices.putMapping({ 
      index, 
      type,
      include_type_name: true,
      body: { 
        properties: schema 
      } 
    })
    
    console.log("Quotes mapping created successfully");
  
  } catch (err) {
    console.error("An error occurred while setting the quotes mapping:");
    console.error(err);
  }
}

/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */

function checkConnection() {
  return new Promise(async (resolve) => {

    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;

    while (!isConnected) {
      try {

        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;

      // eslint-disable-next-line no-empty
      } catch (_) {

      }
    }

    resolve(true);

  });
}

module.exports = {
  esclient,
  setQuotesMapping,
  checkConnection,
  index,
  type
};