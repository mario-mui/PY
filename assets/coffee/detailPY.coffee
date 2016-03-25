PYApp.service "detailService",['$http',($http)->

  _getAllAttr = ()->
    $http.get('/py/attr.json')

  _getDetailById = (_id) ->
    $http.post('/get/py/detail.json',{id:_id})

  _applyPY = (_applyInfo)->
    $http.post('/apply/py.json',_applyInfo)

  _login = (postData)->
    $http.post("/user/login",postData)

  return {
    applyPY           :   _applyPY
    getDetailById     :   _getDetailById
    getAllAttr        :   _getAllAttr
    login             :   _login
  }
]

PYApp.controller 'detailCtl',['$scope','detailService','$mdToast','$mdDialog',($scope,detailService,$mdToast,$mdDialog)->
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
        PYInfoId:id
        createPYUserId:$scope.detail.create_user_id
        applyAttr: attrSelectList
        applyNum:$scope.applyNum

      console.log '@@@@',applyInfo
      detailService.applyPY(applyInfo)
      .then (data)->
        $mdToast.showSimple("申请拼邮成功,耐心等待确认哦...")
        console.log '####',data
      .catch (err)->
        if err.data is 'not login'
          $mdDialog.show(
            templateUrl:'/dialog/login.html'
            clickOutsideToClose:true
          )
        if err.data is 'the same people'
          $mdToast.showSimple("不可以申请自己的拼邮哦..")
    else
      $mdToast.showSimple("请勾选您要的商品信息！")

]

PYApp.controller 'dialogLoginCtl',['$scope','detailService','$mdToast','md5','$mdDialog',($scope,detailService,$mdToast,md5,$mdDialog)->

  $scope.login = ()->
    $scope.loginPost.password = md5.createHash($scope.loginPost.password)
    detailService.login($scope.loginPost)
    .then (data) ->
      if data.data.success
        $mdDialog.cancel()
      else
        $mdToast.showSimple('登录失败,用户名或密码错误')
    ,() ->
      $mdToast.showSimple('登录失败,用户名或密码错误')
]