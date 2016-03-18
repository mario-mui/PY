XApp = angular.module('XApp',['ngMaterial'])

XApp.service "loginService",['$http',($http)->
  _register = (postData) ->
    $http.post("/user/register",{userRegister:postData})

  return {
    register:_register
  }
]

XApp.controller 'loginCtl', ['$scope','$mdToast','loginService',($scope,$mdToast,loginService) ->

  $scope.user =
    username:''
    email:''
    password:''

  $scope.register = ->
    _userInfo =
      username:$scope.user.username
      email:$scope.user.email
      password:$scope.user.password

    loginService.register(_userInfo)
    .then (data)->
      console.log '####',data
      $mdToast.show(
        $mdToast.simple()
        .textContent('恭喜恭喜,注册成功!')
        .position('bottom left' )
        .hideDelay(3000)
      )
    .catch (err)->
      console.log(err)
      $mdToast.show(
        $mdToast.simple()
        .textContent('注册失败,用户名已经存在')
        .position('bottom left' )
        .hideDelay(3000)
      )
]

XApp.directive 'compareTo', ->
  {
    restrict: 'A'
    require: '?ngModel'
    scope: otherModelValue: '=compareTo'
    link: (scope, elm, attr, ctrl) ->
      if !ctrl
        return
      ctrl.$validators.compareTo = (modelValue) ->
        modelValue == scope.otherModelValue

      scope.$watch 'otherModelValue', ->
        if ctrl.$viewValue
          ctrl.$validate()
  }
