const _applyStateMap = {
  waiting:'等待通过',
  pass:'申请通过',
  reject:'申请被拒',
  py_delete:'拼邮信息已删除'
};

const myApplyPageSize = 5;
const myPyPageSize = 5;

module.exports= {
  applyStateMap     :     _applyStateMap,
  myApplyPageSize   :     myApplyPageSize,
  myPyPageSize      :     myPyPageSize
};