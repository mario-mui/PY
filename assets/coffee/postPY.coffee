PYApp.service 'postService',['$http','$mdToast',($http,$mdToast)->
  _getAllAttr = ()->
    $http.get('/py/attr.json')

  _postPY = (postData)->
    $http.post('/pyInfo/post.json',postData)

  _uploadImgs = (fd)->
    $http.post('/post/upload/imgs',fd,{
      withCredentials: true,
      headers: {'Content-Type': undefined },
      transformRequest: angular.identity}
    )

  _dialog = (content)->
    $mdToast.showSimple(content)

  _handleToDeleteImg = (imgs)->
    $http.post('/delete/user/img.json',imgs)

  return {
    getAllAttr   :   _getAllAttr
    postPY       :   _postPY
    uploadImgs   :   _uploadImgs
    dialog       :   _dialog
    handleToDeleteImg : _handleToDeleteImg
  }
]


PYApp.controller 'postCtl', ['$scope','postService',($scope,postService) ->
  $scope.showHints = true;
  $scope.showPostPage = true;
  ##
  # post info scope
  ##
  $scope.postPY =
    attr:[]

  initNewAttr = ->
    $scope.attrValue=[]
    $scope.addAttr = ''

  initPostPage = ->
    postService.getAllAttr()
    .then (data)->
      $scope.attrs = data.data
    initNewAttr()

  initPostPage()

  ##
  # add new attr
  ##
  $scope.addNewAttr = ->
    newAttr = {
      attr_key:$scope.addAttr
      attr_value:$scope.attrValue
    }
    if ($scope.addAttr is '') or ($scope.attrValue is [])
      postService.dialog '商品属性或值不能为空'
    else if ((_.findIndex($scope.postPY.attr,{attr_key:$scope.addAttr})) isnt -1)
      postService.dialog '已经存在该商品属性'
    else
      $scope.postPY.attr.push newAttr
      initNewAttr()

  ##
  # remove attr
  ##
  $scope.removeAttr = (_key)->
    index = _.findIndex $scope.postPY.attr,{attr_key:_key}
    $scope.postPY.attr.splice(index,1)

  ##
  # post PY info
  ##
  $scope.post = ->
    _PYInfo = _.omit($scope.postPY, 'imgs')
    if $scope.postPY.imgs.length > 0
      fd = new FormData()
      _.map $scope.postPY.imgs, (img)->
        fd.append("userImgs",img.lfFile)
      postService.uploadImgs(fd)
      .then (imgs)->
        _PYInfo['imgs'] = imgs.data
        postService.postPY(_PYInfo)
      .then (data) ->
        postService.dialog("#{data.data}拼邮发布成功")
      .catch () ->
        if _PYInfo.imgs?
          postService.handleToDeleteImg(_PYInfo.imgs)
        postService.dialog("拼邮发布失败")
    else
      postService.postPY(_PYInfo)
      .then (data) ->
        postService.dialog("#{data.data}拼邮发布成功")

]