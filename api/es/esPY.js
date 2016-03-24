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

_getInfoById = function (_id){
  var promise = esClient.get({
    index: 'py_tpl',
    type: 'py_info',
    id:_id
  });
  return promise;
};

module.exports = {
  getPYByOffset    :   _getPYByOffset,
  getInfoById     :   _getInfoById
};