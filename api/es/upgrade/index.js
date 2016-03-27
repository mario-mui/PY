"use strict";

var esClient = require("../esClient");
var esCurVersion = require("./version").version;
var promise = require("bluebird");

class UpdateAction {

  constructor(_version,cb){
    this.version = _version;
    this.getAction();
    this.doAction(this,cb);
  }

  getAction(){
    this.actionFile = "action/"+this.version;
    this.action = require(__dirname+"/"+this.actionFile);
  }

  doAction(that,cb) {
    var _doAction = new promise(function (resolve, reject) {
      that.action(function (err, newVersion) {
        if (err) {
          reject(err);
        } else {
          resolve(newVersion);
        }
      })
    });

    _doAction.then(function (newVersion) {
        esClient.index({
          index: "py_version",
          type: "version",
          id: "_version",
          refresh: true,
          ignore_unavailable: true,
          body: {
            version:newVersion
          }
        }).then(function () {
          cb(newVersion)
        }).catch(function(err){
          console.log('@#!#@',err)
        })

      }
    )
  }
}

const checkVersion = function (cb){

  esClient.getSource({
    index: "py_version",
    type: "version",
    id: "_version",
    ignore_unavailable: true
  })
  .then(function (source){
    cb(source.version)
  })
  .catch(function (err){
    var version = {
      version:0
    };

    cb(version);
  })

};

const doUpgrade = function (_version){
  if (_version.version < esCurVersion){
    new UpdateAction(_version.version,doUpgrade);
  }else{
    process.exit(0);
  }
};

checkVersion(doUpgrade);