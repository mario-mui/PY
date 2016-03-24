PYApp.service "detailService",['$http',($http)->

  _getAllAttr = ()->
    $http.get('/py/attr.json')

  _getDetailById = (_id) ->
    $http.post('/get/py/detail.json',{id:_id})

  _applyPY = (_applyInfo)->
    $http.post('/get/py/detail.json',{id:_id})

  return {
    applyPY           :   _applyPY
    getDetailById     :   _getDetailById
    getAllAttr        :   _getAllAttr
  }
]

PYApp.controller 'detailCtl',['$scope','detailService','$mdToast',($scope,detailService,$mdToast)->
  $scope.rate = 0
  $scope.applyNum = 0
  paths = window.document.location.pathname.split('/');
  id = paths[paths.length-1]

  detailService.getAllAttr()
  .then (data)->
    $scope.attrMap = data.data

  detailService.getDetailById(id)
  .then (data)->
    $scope.detail = data.data

  $scope.commentRateHover = (_value)->
    $scope.overStar = _value
    $scope.rateInfo = rateMap[_value]

  $scope.applyPY = ()->
    attrSelectList = []
    _.map $scope.detail.good_attr, (attr)->
      if (_.has attr,'checkValue')
        _attrSelect =
          attr_key:attr.attr_key
          attr_value:attr.checkValue
        attrSelectList.push _attrSelect
    if attrSelectList.length is $scope.detail.good_attr.length
      applyInfo =
        applyAttr: attrSelectList
        applyNum:$scope.applyNum
      console.log applyInfo
    else
      $mdToast.showSimple("请勾选您要的商品信息！")

]