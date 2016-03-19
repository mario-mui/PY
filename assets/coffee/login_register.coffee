XApp = angular.module('XApp',['ngMaterial'])

XApp.service "loginService",['$http',($http)->
  _register = (postData) ->
    $http.post("/user/register",{userRegister:postData})

  _login = (postData) ->
    $http.post("/user/login",postData)

  return {
    register  :  _register,
    login     :  _login
  }
]

XApp.controller 'loginCtl', ['$scope','$mdToast','loginService','$window',($scope,$mdToast,loginService,$window) ->

  $scope.user =
    username:''
    email:''
    password:''

  $scope.loginPost =
    username:''
    password:''

  $scope.register = ->
    _userInfo =
      username:$scope.user.username
      email:$scope.user.email
      password:$scope.user.password

    loginService.register(_userInfo)
    .then ()->
      $mdToast.show(
        $mdToast.simple()
        .textContent('恭喜恭喜,注册成功!')
        .position('bottom left' )
        .hideDelay(3000)
      )
    .catch ()->
      $mdToast.show(
        $mdToast.simple()
        .textContent('注册失败,用户名已经存在')
        .position('bottom left' )
        .hideDelay(3000)
      )

  $scope.login = ->
    loginService.login($scope.loginPost)
    .then (data) ->
      if data.data.success
        $window.location.href = data.data.returnTo || '/'
    .catch () ->
      $mdToast.show(
        $mdToast.simple()
        .textContent('登录失败,用户名或密码错误')
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
