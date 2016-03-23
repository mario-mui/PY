PYApp.service "homeService",['$http',($http)->

  _getAllAttr = ()->
    $http.get('/py/attr.json')

  _getListByOffset = (_serach,_from)->
    $http.post('/get/py/list.json',{search:_serach,from:_from})

  _getDetailById = (_id) ->
    $http.post('/get/py/detail.json',{id:_id})

  return {
    getListByOffset   :   _getListByOffset
    getDetailById     :   _getDetailById
    getAllAttr        :   _getAllAttr
  }
]

PYApp.factory 'PYload', ['$http',($http) ->

  PYload = ->
    @items = []
    @busy = false
    @after = ''

  PYload::nextPage = ->
    if @busy
      return
    @busy = true
    url = 'https://api.reddit.com/hot?after=' + @after + '&jsonp=JSON_CALLBACK'
    $http.jsonp(url).success ((data) ->
      items = data.data.children
      i = 0
      while i < items.length
        @items.push items[i].data
        i++
      @after = 't3_' + @items[@items.length - 1].id
      @busy = false
    ).bind(this)

  PYload
]

PYApp.controller 'homeCtl',['$scope','homeService','$uibModal','PYload','$http',($scope,homeService,$uibModal,PYload,$http)->

  $scope.reddit = new PYload();

  $scope.PYinfo = []
  attrMap = {}

  homeService.getListByOffset('',0)
  .then (data)->
    _.map data.data ,(_pyInfo)->
      _pyInfo.imgs = _pyInfo.imgs[..2]
      $scope.PYinfo.push _pyInfo
  homeService.getAllAttr()
  .then (data)->
    attrMap = data.data

  $scope.showDetail = (_id)->
    _info = {
      id:_id
      attrMap:attrMap
    }
    $uibModal.open({
      templateUrl: '/dialog/homeInfoDetail.html',
      controller: 'homeDetailCtl',
      windowClass:'homeInfoDetail'
      resolve:
        info:  ()->
          return angular.copy(_info)
    })

]


PYApp.controller 'homeDetailCtl',['$scope','info','homeService',($scope,info,homeService)->
  $scope.rate = 0
  $scope.attrMap = info.attrMap

  homeService.getDetailById(info.id)
  .then (data)->
    $scope.detail = data.data

  $scope.goodsAttr =
    {
      color:{
        attrName:'颜色'
        values:['黑色','红色','蓝色']
        checkValue:''
      }
      size:{
        attrName:'尺寸'
        values:['32','33','34','35']
        checkValue:''
      }
    }

  $scope.commentRateHover = (_value)->
    $scope.overStar = _value
    $scope.rateInfo = rateMap[_value]

  $scope.close = ()->
    $scope.$dismiss('cancel')
]

