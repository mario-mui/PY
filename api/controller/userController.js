var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');
var shortid = require('shortid');

const _renderUserCenterPage = function *(){
  this.render('user/center/index')
}

const _uploadAvatar = function *(){

  var parts = parse(this);
  var part;
  var avatarPath = __dirname + '../../../user/avatar/';
  while (part = yield parts) {
    avatarName = shortid() + '.png'
    var stream = fs.createWriteStream(path.join(avatarPath, avatarName));
    part.pipe(stream);
    this.response.status = 200;
    this.response.body = {
      "filename" : avatarName
    }
  }
}

module.exports = {
  renderUserCenterPage:_renderUserCenterPage,
  uploadAvatar:_uploadAvatar
}
