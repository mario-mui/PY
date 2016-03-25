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

const _applyPY = function(_applyInfo){
  var promise = esClient.create({
    index:'py_tpl',
    type:'py_apply',
    body: _applyInfo
  });
  return promise
};

module.exports = {
  getPYByOffset     :   _getPYByOffset,
  getInfoById       :   _getInfoById,
  applyPY           :   _applyPY
};