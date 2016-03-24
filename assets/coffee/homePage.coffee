PYApp.service "homeService",['$http',($http)->

  _getListByOffset = (_serach,_from)->
    $http.post('/get/py/list.json',{search:_serach,from:_from})

  return {
    getListByOffset   :   _getListByOffset
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

PYApp.controller 'homeCtl',['$scope','homeService','PYload',($scope,homeService,PYload)->

  $scope.reddit = new PYload();

  $scope.PYinfo = []

  homeService.getListByOffset('',0)
  .then (data)->
    _.map data.data ,(_pyInfo)->
      _pyInfo.imgs = _pyInfo.imgs[..2]
      $scope.PYinfo.push _pyInfo

]
