PYApp.service "homeService",['$http',($http)->

]

PYApp.controller 'homeCtl',['$scope','homeService','$uibModal',($scope,homeService,$uibModal)->

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


]

