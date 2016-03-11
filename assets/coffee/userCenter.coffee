PYApp.controller 'userCenterCtl', ['$scope','alertify','$http',($scope,alertify,$http) ->
  $scope.showHints = true;

  $scope.info = {
    nickname:'mario'
    phone:11577669988
    email:'mario.ma@trantect.com'
    address:'黄埔大厦'
    avatar:'defaultAvatar.png'
  }

  $scope.uploadFile = (files) ->

    fd = new FormData()
    fd.append("file",files[0])


    $http.post('/user/upload/avatar.json',fd,{
      withCredentials: true,
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity}
    ).then (data)->
      $scope.info.avatar = data.data.filename
]
