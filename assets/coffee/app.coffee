PYApp = angular.module('PYApp',['ui.bootstrap'])

PYApp.controller 'navCtl',['$scope',($scope)->

  $scope.isOpen = false
  $scope.navCollapse = false

  $scope.openSearch = ()->
    $scope.isOpen = !$scope.isOpen
  $scope.closeSearch = ()->
    $scope.isOpen = false
]