var tpl = require("./tpl");
var esClient = require("../../../esClient");
var attrObjs = require("./attrValue");
var _ = require("underscore");
var tplName = 'py_tpl';

module.exports = function (cb) {
  esClient.indices.putTemplate({
    name:tplName,
    body:tpl
  }).then(function(){
    _.map(attrObjs,function(attrObj){
      esClient.create({
        index: 'py_tpl',
        type: 'attr_store',
        body: attrObj
      })
    });
    cb(null,{
      version:1
    })
  }).catch(function(err){
    cb(err,{
      version:0
    })
  })
};