const esClient = require("./esClient");

const createUser = function (userInfo,cb){
  esClient.create({
      index: 'py_tpl',
      type: 'user',
      body: userInfo
    })
    .then(function(){
      cb(null,'create success')
    })
};

const _registerUser = function (userInfo,cb){

  esClient.search({
    index: 'py_tpl',
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

const _login = function (username,password,cb){
  esClient.search({
    index: 'py_tpl',
    type: 'user',
    refresh:true,
    body: {
      query: {
        bool:{
          must:[
            {term:{username: username}},
            {term:{password: password}}
          ]
        }

      }
    }
  }).then(function(res){

    if(res.hits.total == 0){
      cb('password or username error',null);
    }else{
      const resUser = res.hits.hits[0];
      const user = {
        id:resUser._id,
        username:resUser._source.username,
        email:resUser._source.email
      };
      cb(null,user);
    }
  }).catch(function(err){
    cb(err,null)
  });
};


const _getInfoByUserId = function (userId){
  var promise = esClient.get({
    index: 'py_tpl',
    type: 'user',
    id:userId,
    _source:['username','nickname','email','phone','address','avatar']
  });
  return promise;
};

const _getInfoByUserIds = function (userIds){
  var promise = esClient.search({
    index: 'py_tpl',
    type: 'user',
    body:{
      query:{
        terms:{
          _id:userIds
        }
      }
    },
    _source:['username','avatar']
  });
  return promise;
};

const _saveUserInfoById = function (userId,userInfo){

  var promise = esClient.update({
    index: 'py_tpl',
    type: 'user',
    id:userId,
    body:{
      doc:userInfo
    }
  });
  return promise;

};


module.exports = {
  registerUser      :   _registerUser,
  login             :   _login,
  getInfoByUserId   :   _getInfoByUserId,
  saveUserInfoById  :   _saveUserInfoById,
  getInfoByUserIds  :   _getInfoByUserIds
};