var esClient = require("./esClient");

var createUser = function (userInfo,cb){
  esClient.create({
      index: 'py_user',
      type: 'user',
      body: userInfo
    })
    .then(function(){
      cb(null,'create success')
    })
};

var _registerUser = function (userInfo,cb){

  esClient.search({
    index: 'py_user',
    type: 'user',
    body: {
      query: {
        match: {
          username: userInfo.username
        }
      }
    }
  }).then(function(res){
    if(res.hits.total == 0){
      createUser(userInfo,cb)
    }else{
      cb('user exit',null)
    }
  }).catch(function(err){
    if(err.body.error.type=="index_not_found_exception"){
      createUser(userInfo,cb)
    }else{
      cb(err,null)
    }
  });

};

module.exports = {
  registerUser   :   _registerUser
};