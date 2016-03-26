const esClient = require("./esClient");
const size = 10;

const _getPYByOffset = function(_search,from){
  var regexp = '.*' + _search + '.*';

  var promise = esClient.search(
    {
      index: 'py_tpl',
      type: 'py_info',
      body: {
        query: {
          bool:{
            should:[
              {
                regexp:{
                  title:regexp
                }
              },
              {
                regexp:{
                  good_desc:regexp
                }
              }
            ]
          }
        }
      },
      from:from,
      size:size,
      _source:['title','good_desc','good_imgs','create_time']
    }
  );
  return promise
};

const _getInfoById = function (_id){
  var promise = esClient.get({
    index: 'py_tpl',
    type: 'py_info',
    id:_id
  });
  return promise;
};

const _getPYCreateUserIdByInfoId = function (_id){
  var promise = esClient.get({
    index: 'py_tpl',
    type: 'py_info',
    id:_id,
    _source:['create_user_id']
  });
  return promise;
};

const _applyPY = function(_applyInfo){
  var promise = esClient.create({
    index:'py_tpl',
    type:'py_apply',
    body: _applyInfo
  });
  return promise
};

const _getApplyListByPYIds = function(ids){
  var promise = esClient.search({
    index:'py_tpl',
    type:'py_apply',
    body:{
      query: {
        terms:{
          py_info_id:ids
        }
      }
    }
  });
  return promise;
};

const _getTotalMyCreatePYList = function(userId){
  var promise = esClient.count({
    index:'py_tpl',
    type:'py_info',
    body:{
      query: {
        term:{
          create_user_id:userId
        }
      }
    }
  });

  return promise;
};

const _getMyPYList = function (userId,from,size){
  var promise = esClient.search({
    index: 'py_tpl',
    type: 'py_info',
    body: {
      query: {
        term:{
          create_user_id:userId
        }
      }
    },
    from:from,
    size:size,
    _source:['title']
  });
  return promise
};

const _applyActionYes = function(){

};

module.exports = {
  getMyPYList          :   _getMyPYList,
  getPYByOffset         :   _getPYByOffset,
  getInfoById           :   _getInfoById,
  applyPY               :   _applyPY,
  getApplyListByPYIds   :   _getApplyListByPYIds,
  getTotalMyCreatePYList:   _getTotalMyCreatePYList,
  getUserId             :   _getPYCreateUserIdByInfoId
};