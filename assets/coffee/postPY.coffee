PYApp.controller 'postCtl', ['$scope','alertify',($scope,alertify) ->
  $scope.showHints = true;
  $scope.attrs = {
    color : '颜色'
    size  : '尺寸'
    model : '型号'
  }

  initNewAttr = ->
    $scope.attrValue=[]
    $scope.addAttr = ''

  initNewAttr()

  $scope.postPY =
    title:''
    attr:{}

  $scope.addNewAttr = ->
    newAttr = {}
    newAttr[$scope.addAttr] = $scope.attrValue

    if ($scope.addAttr is '') or ($scope.attrValue is [])
      alertify.error("商品属性或值不能为空")

    else if _.has($scope.postPY.attr,$scope.addAttr)
      alertify.error("已经存在该商品属性")
    else
      $scope.postPY.attr = _.extend $scope.postPY.attr,newAttr
      initNewAttr()

  $scope.removeAttr = (_key)->
    $scope.postPY.attr = _.omit($scope.postPY.attr, _key)

]