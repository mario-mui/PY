var esClient = require("./esClient");
const Promise = require("bluebird");

var _getAllAttr = function (cb){

  esClient.search({
    index: 'py_tpl',
    type: 'attr_store',
    body: {
      query: {
        match_all:{}
      }
    }
  }).then(function(res){
    cb(null,res.hits.hits);
  }).catch(function(err){
    cb(err,null);
  });

};

var _postPYInfo = function (_info,cb){
  esClient.create({
    index: 'py_tpl',
    type: 'py_info',
    body: _info
  }).then(function (res){
    cb(null,res)
  }).catch(function(err){
    cb(err,null);
  })
};


module.exports = {
  getAllAttr   :   Promise.promisify(_getAllAttr),
  postPYInfo   :   Promise.promisify(_postPYInfo)
};