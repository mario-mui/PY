XApp = angular.module('XApp',['ngMaterial','angular-md5'])

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

XApp.controller 'loginCtl', ['$scope','$mdToast','loginService','$window','md5',($scope,$mdToast,loginService,$window,md5) ->

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
      password:md5.createHash($scope.user.password || '')

    loginService.register(_userInfo)
    .then ()->
      $mdToast.showSimple('恭喜恭喜,注册成功!')
      setTimeout(()->
        $window.location.href = '/login'
      ,500
      )

    .catch ()->
      $mdToast.showSimple('注册失败,用户名已经存在')

  $scope.login = ->
    $scope.loginPost.password = md5.createHash($scope.loginPost.password)
    loginService.login($scope.loginPost)
    .then (data) ->
      if data.data.success
        $window.location.href = data.data.returnTo || '/'
    .catch () ->
      $mdToast.showSimple('登录失败,用户名或密码错误')
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
