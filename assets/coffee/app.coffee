PYApp = angular.module('PYApp',['ui.bootstrap'])

PYApp.controller 'navCtl',['$scope',($scope)->

  $scope.isOpen = false
  $scope.navCollapse = false

  $scope.openSearch = ()->
    $scope.isOpen = !$scope.isOpen
  $scope.closeSearch = ()->
    $scope.isOpen = false
]

PYApp.directive 'infoAttr', ->
  restrict: 'E',
  require: '?ngModel',
  scope:
    modelValue:"=value"
    checkValue:"="
  template: """ <div class='col-sm-3 control-label'>
                <span ng-bind="(modelValue.attrName)+':'"></span>
              </div>
              <div class='col-sm-6'>
                <ul class='goods-param'>
                  <li class='goods-param-li' ng-repeat='value in modelValue.values' ng-click='choose(value)' ng-class='{goodAttrActive:checkValue = value}'>
                    <span ng-bind='value'></span>
                  </li>
                </ul>
              </div>
            """

  link: (scope, elm, attr, ctrl) ->
    scope.choose = (value) ->
      console.log '######',value
      scope.checkValue = value