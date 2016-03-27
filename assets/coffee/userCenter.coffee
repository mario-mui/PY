PYApp.service 'userCenterService',['$http',($http)->

  _getUserInfo = ()->
    $http.post('/user/info.json',{})

  _saveUserInfo = (_userInfo)->
    $http.post('/save/user/info.json',_userInfo)

  _uploadAvatar = (fd)->
    $http.post('/user/upload/avatar',fd,{
      withCredentials: true,
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity}
    )

  _getAllAttr = ()->
    $http.get('/py/attr.json')

  _getMyPYList = (info)->
    $http.post('/get/my/py/list.json',{page:info})

  _getTotalMyPYList = ()->
    $http.get('/total/py/list.json')

  _getTotalMyApply = ()->
    $http.get('/total/my/apply/list.json')

  _applyYes = (pyId,applyId)->
    applyInfo = {
      pyId:pyId
      applyId:applyId
    }
    $http.post('/apply/action/yes.json',applyInfo)

  _applyNo = (pyId,applyId)->
    applyInfo = {
      pyId:pyId
      applyId:applyId
    }
    $http.post('/apply/action/no.json',applyInfo)

  _completePy = (pyId)->
    $http.post('/py/action/complete.json',{pyId:pyId});

  _deletePy = (pyId)->
    $http.post('/py/action/delete.json',{pyId:pyId});

  _getMyApplyList = (page)->
    $http.post('/get/my/apply/list.json',{page:page})

  _cancelMyApply = (applyId)->
    $http.post('/cancel/my/apply.json',{applyId:applyId})

  return {
    getUserInfo   :   _getUserInfo
    saveUserInfo  :   _saveUserInfo
    uploadAvatar  :   _uploadAvatar
    getMyPYList   :   _getMyPYList
    getAllAttr    :   _getAllAttr
    getTotalMyPYList  : _getTotalMyPYList
    applyYes      :   _applyYes
    applyNo       :   _applyNo
    completePy    :   _completePy
    deletePy      :   _deletePy
    getMyApplyList:   _getMyApplyList
    cancelMyApply :   _cancelMyApply
    getTotalMyApply:  _getTotalMyApply
  }
]

PYApp.controller 'userCenterCtl', ['$scope','$http','userCenterService','$mdToast',($scope,$http,userCenterService,$mdToast) ->


  ## base info
  $scope.showHints = true;

  userCenterService.getAllAttr()
  .then (data)->
    $scope.attrMap = data.data

  $scope.initUserCenter = ()->

    userCenterService.getUserInfo()
    .then (data) ->
      $scope.userInfo = data.data

  $scope.saveUserInfo = ()->
    userCenterService.saveUserInfo($scope.userInfo)
    .then ()->
      $mdToast.showSimple('保存用户信息成功..')
    .catch ()->
      $mdToast.showSimple('保存用户信息失败..')

  $scope.uploadFile = (files) ->

    fd = new FormData()
    fd.append("file",files[0])
    userCenterService.uploadAvatar(fd)
    .then (data)->
      $scope.userInfo.avatar = data.data.filename

  ###
    ## my py list
  ###

  $scope.initMyPY = ()->
    $scope.currentMyPYPage = 1
    userCenterService.getTotalMyPYList()
    .then (data)->
      $scope.myPyTotalList = data.data

    $scope.$watch('currentMyPYPage',()->
      userCenterService.getMyPYList($scope.currentMyPYPage)
      .then (data)->
        $scope.myPYList = data.data
    )


  $scope.applyYes = (pyId,applyId,applyName)->
    userCenterService.applyYes(pyId,applyId)
    .then ()->
      pyIndex = _.findIndex $scope.myPYList,{id:pyId}
      applyIndex = _.findIndex $scope.myPYList[pyIndex].applyList,{applyId:applyId}
      $scope.myPYList[pyIndex].applyList[applyIndex].applyState = 'pass'
      $mdToast.showSimple("通过了#{applyName}的申请..")
    ,()->
      $mdToast.showSimple("操作失败..")
    .catch ()->
      $mdToast.showSimple("操作失败..")

  $scope.applyNo = (pyId,applyId,applyName)->

    userCenterService.applyNo(pyId,applyId)
    .then ()->
      pyIndex = _.findIndex $scope.myPYList,{id:pyId}
      applyIndex = _.findIndex $scope.myPYList[pyIndex].applyList,{applyId:applyId}
      $scope.myPYList[pyIndex].applyList.splice(applyIndex,1)
      $mdToast.showSimple("拒绝了#{applyName}的申请..")

  $scope.completePY = (pyId,pyTitle)->
    userCenterService.completePy(pyId)
    .then ()->
      $mdToast.showSimple("完成了拼邮#{pyTitle}..")
    .catch ()->
      $mdToast.showSimple("操作失败..")

  ##TODO edit py
  $scope.editPY = (pyId)->

  $scope.deletePY = (pyId,pyTitle)->
    userCenterService.deletePy(pyId)
    .then ()->
      $mdToast.showSimple("删除了拼邮#{pyTitle}..")
    .catch ()->
      $mdToast.showSimple("操作失败..")


  ###
    ## my apply list
  ###

  $scope.initMyApplyList = ()->
    $scope.currentMyApplyPage = 1

    userCenterService.getTotalMyApply()
    .then (data)->
      $scope.myApplyTotal = data.data

    $scope.$watch('currentMyApplyPage',()->
      userCenterService.getMyApplyList($scope.currentMyApplyPage)
      .then (data)->
        $scope.applyList = data.data
    )

  $scope.deleteMyApply = (applyId,pyTitle)->
    userCenterService.cancelMyApply(applyId)
    .then ()->
      $mdToast.showSimple("取消了#{pyTitle}拼邮的申请..")
      userCenterService.getMyApplyList()
    .then (data)->
      $scope.applyList = data.data
    .catch ()->
      $mdToast.showSimple("操作失败..")

]
