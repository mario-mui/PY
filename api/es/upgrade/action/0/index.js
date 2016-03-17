var tpl = require("./tpl");
var esClient = require("../../../esClient");
var tplName = 'py_user_tpl';

module.exports = function (cb) {
  esClient.indices.putTemplate({
    name:tplName,
    body:tpl
  }).then(function(){
    cb(null,{
      version:1
    })
  }).catch(function(err){
    cb(err,{
      version:0
    })
  })
};