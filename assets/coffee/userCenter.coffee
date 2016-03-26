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
    $http.post('/get/my/py/list.json',info)

  _getTotalMyPYList = ()->
    $http.get('/total/py/list.json')

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

  return {
    getUserInfo   :   _getUserInfo
    saveUserInfo  :   _saveUserInfo
    uploadAvatar  :   _uploadAvatar
    getMyPYList   :   _getMyPYList
    getAllAttr    :   _getAllAttr
    getTotalMyPYList  : _getTotalMyPYList
    applyYes      :   _applyYes
    applyNo       :   _applyNo
  }
]

PYApp.controller 'userCenterCtl', ['$scope','$http','userCenterService','$mdToast',($scope,$http,userCenterService,$mdToast) ->


  ## base info
  $scope.showHints = true;

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

  $scope.initMyPY = ()->
    $scope.currentMyPYPage = 1
    userCenterService.getAllAttr()
    .then (data)->
      $scope.attrMap = data.data

    userCenterService.getTotalMyPYList()
    .then (data)->
      $scope.totalList = data.data

    userCenterService.getMyPYList({})
    .then (data)->
      console.log 'data',data.data
      $scope.applyList = data.data

  $scope.applyYes = (applyId)->
    console.log 'apply',applyId

  $scope.applyNo = (applyId)->

    console.log 'no',applyId

  $scope.completePY = (pyId)->
    console.log '##',pyId

  $scope.editPY = (pyId)->

  $scope.deletePY = (pyId)->


  $scope.postList = [
    {
      title:'阿迪达斯拼邮1'
      link:'www.baidu.com'
      status:'open'
      applyPeople:[
        {
          uid:'11'
          username:'mario1'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'31'
            }
          ]
          status:'ok'
        }
        {
          uid:'12'
          username:'mario2'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'32'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'34'
            }
          ]
          status:'wait'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'35'
            }
          ]
          status:'wait'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
      ]
    }

    {
      title:'阿迪达斯拼邮2'
      link:'www.baidu.com'
      status:'open'
      applyPeople:[
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
      ]
    }

    {
      title:'阿迪达斯拼邮3'
      link:'www.baidu.com'
      status:'open'
      applyPeople:[
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'ok'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
        {
          uid:'11'
          username:'mario'
          attr:[
            {
              key:'颜色'
              value:'红色'
            }
            {
              key:'大小'
              value:'33'
            }
          ]
          status:'wait'
        }
      ]
    }
  ]
  $scope.applyList = [
    {
      postId:'11'
      title:'apply1'
      owner:'mario'
      status:'pass' #pass,applying,reject
    }
  ]


  ## my apply list
]
