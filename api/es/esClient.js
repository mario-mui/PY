var es = require('elasticsearch');

var es_client = new es.Client({
  host:'localhost:9200'
});

module.exports = es_client;