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

  return {
    getUserInfo   :   _getUserInfo
    saveUserInfo  :   _saveUserInfo
    uploadAvatar  :   _uploadAvatar
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


  ## my post list
  $scope.totalList = 44
  $scope.currentPage = 2
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
