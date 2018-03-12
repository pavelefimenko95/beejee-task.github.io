app.controller('AppRootController',['$scope', function($scope){

  if(localStorage['items']){
    $scope.items = JSON.parse(localStorage['items']);
  }

  $scope.newItem = {
    title: '',
    comments: []
  }

  $scope.selectedItemIndex = 0;
  $scope.comment = '';
  $scope.isShowComments = false;

  // functions
  function refreshState(){
    $scope.items = JSON.parse(localStorage['items']);
  }

  $scope.addItem = function(){
    if(localStorage['items']){
      var items = JSON.parse(localStorage['items']);
      items[Object.keys(items).length] = $scope.newItem;
      localStorage['items'] = JSON.stringify(items);
      $scope.newItem.title = '';
      refreshState();
    } else{
      var items = {
        '0': $scope.newItem
      }
      localStorage['items'] = JSON.stringify(items);
      $scope.newItem.title = '';
      refreshState();
    }
  }

  $scope.removeItem = function(index){
    var items = JSON.parse(localStorage['items']);
    delete items[index];
    var newItems = {}
    var itemsKeys = Object.keys(items);
    for (var i = 0; i < itemsKeys.length; i++) {
      newItems[i] = items[itemsKeys[i]];
    }
    localStorage['items'] = JSON.stringify(newItems);
    refreshState();
  }

  $scope.selectItem = function(index){
    $scope.selectedItemIndex = index;
  }

  $scope.addComment = function(){
    if (window.event.keyCode === 13) {
      var items = JSON.parse(localStorage['items']);
      items[$scope.selectedItemIndex].comments.push($scope.comment)
      localStorage['items'] = JSON.stringify(items);
      refreshState();
      $scope.comment = '';
    }

  }

  $scope.toggleComments = function(){
    $scope.isShowComments = !$scope.isShowComments;
  }

  document.body.onkeydown = function(){
    if((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))){
      $scope.$apply($scope.toggleComments)
    }
  }
  // functions

}]);
