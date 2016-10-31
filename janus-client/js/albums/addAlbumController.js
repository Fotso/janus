function addAlbumController($scope,$http,$stateParams,notification,$location,$window,$interval){
	$scope.files = [];//our list of album file
  $scope.photoDetail = function(){
    $scope.filename = $stateParams.filename;
  }
  // we watch the url change
  // if the url contains edit, then we display our form
  $scope.isEdit = false;
  $scope.$watch(function(){
    return $location.path()
  }, function(value){
    if(value.match("edit")){
      $scope.isEdit =true;
    }
  });

  // from albumThumbnail, we add our custom button (select all checkbox)
  // it select and deselect the checkboxes http://localhost:8080/#/albums/edit/57caeb25b616e084304799cc
  $scope.selectedLabelList = [];
  var selectedAll_flag = null;
  $scope.isSelectAll = function(files) {
    $scope.master = false;
    $scope.selectedLabelList = [];
    if(this.master){
      this.master = true;
      selectedAll_flag = true;
    }else{
      this.master = false;
      selectedAll_flag = false;
    }
    //we put the element in our array
    angular.forEach(files, function(file) {
      $scope.selectedLabelList.push(file);
    });
    angular.forEach($scope.selectedLabelList, function(item){
      item.Selected = selectedAll_flag;
    });
    //we remove the elements in our array
    //if the highest checkbox have been deselected
    if(!this.master){    
      angular.forEach(files, function(file) {
        var index = $scope.selectedLabelList.indexOf(file);
        if(index > -1){
          $scope.selectedLabelList.splice(index,1);
        }
      });
    }
  }

  $scope.isLabelChecked = function(files) {
    if(this.file.Selected){
      $scope.selectedLabelList.push(this.file);
      if($scope.selectedLabelList.length == files.length){
        $scope.master = true;
      }else{
        //nothing happened
      }
    }else{
      //we have deselected an element so we deselect the higher checkbox
      var index = $scope.selectedLabelList.indexOf(this.file);
      $scope.selectedLabelList.splice(index,1);
      this.__proto__.master = false;
    } 
  };

  $scope.deletePhoto = function(albumID) {
    var id = albumID;
    //here we take the photo selected by the user and we delete them
    $http({
      method: 'POST',
      url: 'http://localhost:8888/api/albums/files/'+id,
      data: $scope.selectedLabelList
    }).then(function successCallback(response) {
      if(response.status == 200){
        notification.log('Images sucessfully deleted!', { addnCls: 'humane-flatty-success' });
      }
      else{  
        notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
      }
    }, function errorCallback(response) {
        notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
    });
    $interval(function(){
      $window.location.reload();
    }, 500, 1);
  }

  $scope.filesChanged = function(element){
    angular.forEach(element.files, function(file) {
	    $scope.files.push(file)
    });
    $scope.$apply();
  }

  $scope.remove = function(file){
    console.log(file);  
  	var index= $scope.files.indexOf(file);
  	$scope.files.splice(index,1);
  }

  $scope.upload_photo = function(){
  	var uploadUrl = 'http://localhost:8888/api/albums/'+$stateParams.id;
    var fd = new FormData();
    angular.forEach($scope.files, function(file){
      fd.append('files',file);
    });
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers:{'Content-type':undefined}
    }).then(function successCallback(response) {
      notification.log('Album sucessfully added!', { addnCls: 'humane-flatty-success' });
    }, function errorCallback(response) {
      notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
    });
    $interval(function(){
      $window.location.reload();
    }, 2000, 1);
  }

}

export default addAlbumController;