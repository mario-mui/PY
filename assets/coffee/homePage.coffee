PYApp.service "homeService",['$http',($http)->

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

PYApp.controller 'homeCtl',['$scope','homeService','$uibModal','PYload',($scope,homeService,$uibModal,PYload)->

  $scope.reddit = new PYload();
  $scope.PYinfo = [
    {
      id:1
      title:'adidas'
      imgs:['/userImg/img1.jpg','/userImg/img2.jpg','/userImg/img3.jpg']
      desc:'With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.'
      flags:['#鞋子','#美国','#adidas']
      date:'2016-03-01'
    }
    {
      id:2
      title:'adidas'
      imgs:['/userImg/img1.jpg','/userImg/img2.jpg','/userImg/img3.jpg']
      desc:'With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.'
      flags:['#鞋子','#美国','#adidas']
      date:'2016-03-01'
    }
    {
      id:3
      title:'adidas'
      imgs:['/userImg/img1.jpg','/userImg/img2.jpg','/userImg/img3.jpg']
      desc:'With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.'
      flags:['#鞋子','#美国','#adidas']
      date:'2016-03-01'
    }
    {
      id:4
      title:'adidas'
      imgs:['/userImg/img1.jpg','/userImg/img2.jpg','/userImg/img3.jpg']
      desc:'With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.'
      flags:['#鞋子','#美国','#adidas']
      date:'2016-03-01'
    }
    {
      id:5
      title:'adidas'
      imgs:['/userImg/img1.jpg','/userImg/img2.jpg','/userImg/img3.jpg']
      desc:'With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.'
      flags:['#鞋子','#美国','#adidas']
      date:'2016-03-01'
    }
    {
      id:6
      title:'adidas'
      imgs:['/userImg/img1.jpg','/userImg/img2.jpg','/userImg/img3.jpg']
      desc:'With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.'
      flags:['#鞋子','#美国','#adidas']
      date:'2016-03-01'
    }
  ]

  $scope.showDetail = (_id)->
    $uibModal.open({
      templateUrl: '/dialog/homeInfoDetail.html',
      controller: 'homeDetailCtl',
      windowClass:'homeInfoDetail'
      resolve:
        info:  ()->
          return angular.copy(_id)
    })
]


PYApp.controller 'homeDetailCtl',['$scope','info',($scope,info)->
  $scope.rate = 0
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
]

