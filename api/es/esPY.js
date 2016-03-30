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

const _getPyInfoByIds = function(ids){
  var promise = esClient.search({
    index:'py_tpl',
    type:'py_info',
    body:{
      query: {
        terms:{
          _id:ids
        }
      }
    },
    _source:['title']
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
        bool:{
          must:[
            {
              terms:{
                py_info_id:ids
              }
            },
            {
              terms:{
                apply_state:['pass','waiting']
              }
            }
          ]
        }
      }
    }
  });
  return promise;
};

const _getAllApplyListByPYIds = function(ids){
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

const _getApplyInfoById = function(_id){
  var promise = esClient.get({
    index:'py_tpl',
    type:'py_apply',
    id:_id
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

const _getTotalMyApply = function(userId){
  var promise = esClient.count({
    index:'py_tpl',
    type:'py_apply',
    body:{
      query: {
        term:{
          apply_user_id:userId
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
    _source:['title','count']
  });
  return promise
};

const _applyActionYes = function(applyId){
  var promise = esClient.update({
    index:'py_tpl',
    type:'py_apply',
    id:applyId,
    body: {
      doc:{
        apply_state:'pass'
      }
    }
  });
  return promise
};

const _applyActionNo = function(applyId){
  var promise = esClient.update({
    index:'py_tpl',
    type:'py_apply',
    id:applyId,
    body: {
      doc:{
        apply_state:'reject'
      }
    }
  });
  return promise
};

//update apply_state to py_delete
const _deleteApplyByIds = function (deleteBody) {
  var promise = esClient.bulk({
    body:deleteBody
  });
  return promise
};

const _completePY = function(pyId){
  var promise = esClient.update({
    index:'py_tpl',
    type:'py_info',
    id:pyId,
    body: {
      doc:{
        py_state:'complete'
      }
    }
  });
  return promise
};

const _deletePY = function (pyId){
  var promise = esClient.delete({
    index:'py_tpl',
    type:'py_info',
    id:pyId
  });
  return promise
};

// py_apply action

const _getMyApplyList = function(userId,from,size){
  var promise = esClient.search({
    index:'py_tpl',
    type:'py_apply',
    body: {
      query: {
        term:{
          apply_user_id:userId
        }
      }
    },
    from:from,
    size:size
  });
  return promise
};

const _deleteMyApply = function (applyId){
  var promise = esClient.delete({
    index:'py_tpl',
    type:'py_apply',
    id:applyId
  });
  return promise
};

const _getCountApplyByStatue = function(infoId,statue){
  var promise = esClient.search({
    index:'py_tpl',
    type:'py_apply',
    body: {
      query: {
        bool:{
          must:[
            {
              term:{
                py_info_id:infoId
              }
            },
            {
              term:{
                apply_state:statue
              }
            }
          ]
        }
      },
      aggs : {
        sum_apply:{
          sum : {
            field : "apply_count"
          }
        }
      }
    }
  });
  return promise
};

const _postComment = function (comment){
  var promise = esClient.create({
    index:'py_tpl',
    type:'py_comment',
    body: comment
  });
  return promise
};

const _getComment = function (infoId){
  var promise = esClient.search({
    index:'py_tpl',
    type:'py_comment',
    body:{
      query: {
        term:{
          py_info_id:infoId
        }
      }
    }
  });
  return promise
};

module.exports = {
  getMyPYList           :   _getMyPYList,
  getPYByOffset         :   _getPYByOffset,
  getInfoById           :   _getInfoById,
  applyPY               :   _applyPY,
  getApplyListByPYIds   :   _getApplyListByPYIds,
  getAllApplyListByPYIds:   _getAllApplyListByPYIds,
  getTotalMyCreatePYList:   _getTotalMyCreatePYList,
  getUserId             :   _getPYCreateUserIdByInfoId,
  applyActionYes        :   _applyActionYes,
  applyActionNo         :   _applyActionNo,
  deleteApplyByIds      :   _deleteApplyByIds,
  completePY            :   _completePY,
  deletePY              :   _deletePY,
  getMyApplyList        :   _getMyApplyList,
  getPyInfoByIds        :   _getPyInfoByIds,
  getTotalMyApply       :   _getTotalMyApply,
  deleteMyApply         :   _deleteMyApply,
  getApplyInfoById      :   _getApplyInfoById,
  getCountApplyByStatue :   _getCountApplyByStatue,
  postComment           :   _postComment,
  getComment            :   _getComment
};