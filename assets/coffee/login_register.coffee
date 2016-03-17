XApp = angular.module('XApp',['ngMaterial'])


XApp.controller 'loginCtl', ['$scope','$mdToast',($scope,$mdToast) ->

  $scope.user =
    username:''
    email:''
    password:''

  $scope.showHints = true

  $scope.register = ->
    console.log '####',$scope.user

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
