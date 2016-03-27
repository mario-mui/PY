const _ = require('underscore');
const fs = require('fs');
const path = require('path');


const _deleteUserImgs = function *(){
  var userImgPath = __dirname + '../../../user/userImg/';
  var ctx = this;
  var files = ctx.request.body;
  _.map(files,function(file){
    fs.unlink(path.join(userImgPath, file));
  });
  ctx.status = 200;

};

module .exports = {
  deleteUserImgs : _deleteUserImgs
};