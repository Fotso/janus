/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(35);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _constants = __webpack_require__(2);

	var _configRouter = __webpack_require__(3);

	var _configRouter2 = _interopRequireDefault(_configRouter);

	var _runRouter = __webpack_require__(15);

	var _runRouter2 = _interopRequireDefault(_runRouter);

	var _authController = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
	var myApp = angular.module('myApp', ['ng-admin', 'ui.router']);
	//some constantes
	myApp.constant('AUTH_EVENTS', _constants.AUTH_EVENTS);
	myApp.constant('USER_ROLES', _constants.USER_ROLES);
	myApp.constant('LOCAL_TOKEN_KEY', _constants.LOCAL_TOKEN_KEY);
	myApp.constant('LOCAL_ADMIN', _constants.LOCAL_ADMIN);
	myApp.constant('LOCAL_SUPER_ADMIN', _constants.LOCAL_SUPER_ADMIN);
	myApp.constant('LOCAL_USER_ID', _constants.LOCAL_USER_ID);

	//adding custom routing
	//we link our custom button with our template
	myApp.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', __webpack_require__(12)]);
	myApp.config(_configRouter2.default);
	myApp.run(_runRouter2.default);
	//custom auth service for the login, logout, registration operations
	myApp.service('AuthService', ['$http', '$q', 'LOCAL_TOKEN_KEY', 'LOCAL_ADMIN', 'LOCAL_SUPER_ADMIN', 'LOCAL_USER_ID', __webpack_require__(13)]);
	//custom album service, we put the data from the entry into our template
	myApp.service('albumService', ['$location', __webpack_require__(16)]);
	myApp.service('videoService', ['$location', __webpack_require__(17)]);
	//custom directive to link our edit button to our template
	myApp.directive('editPhoto', ['$location', 'albumService', __webpack_require__(18)]);
	myApp.directive('editVideo', ['$location', 'videoService', __webpack_require__(19)]);
	//myApp.directive('deleteFile',['$location','albumService', require('./albums/deleteFile.js')]);
	myApp.directive('fileInput', ['$parse', __webpack_require__(20)]);
	myApp.directive('fileInputVideo', ['$parse', __webpack_require__(21)]);
	myApp.controller('authController', ['$scope', 'AuthService', '$state', '$http', 'AUTH_EVENTS', 'notification', '$timeout', '$window', __webpack_require__(10)]);
	//myApp.controller('authController', ['$scope', '$state', '$uibModal', '$log', 'AuthService', '$http', 'AUTH_EVENTS',require('./auth/authController')]);
	myApp.controller('addAlbumController', ['$scope', '$http', '$stateParams', 'notification', '$location', '$window', '$interval', __webpack_require__(5)]);
	myApp.controller('addVideoController', ['$scope', '$http', '$stateParams', 'notification', '$location', '$window', '$interval', __webpack_require__(8)]);
	// declare a function to run when the module bootstraps (during the 'config' phase)
	myApp.config(['NgAdminConfigurationProvider', function (nga) {
	    var truncate = function truncate(value) {
	        if (!value) return '';
	        return value.length > 50 ? value.substr(0, 50) + '...' : value;
	    };
	    // create an admin application
	    var admin = nga.application('Janus Admin').baseApiUrl('http://127.0.0.1:8888/api/'); // main API endpoint
	    console.log(window.sessionStorage.getItem(_constants.LOCAL_SUPER_ADMIN));
	    //if the user is login as super admin
	    //then we render a superadmin interface
	    if (window.sessionStorage.getItem(_constants.LOCAL_SUPER_ADMIN) == "true") {
	        console.log("qsdqsdqsdqsdqsd");
	        //add entities
	        // the API endpoint for this entity will be 'http://localhost:8080/api/entity_name/
	        //example http://localhost:8080/api/users/
	        admin.addEntity(nga.entity('users'));
	        admin.addEntity(nga.entity('events'));
	        admin.addEntity(nga.entity('categories'));
	        admin.addEntity(nga.entity('companies'));
	        admin.addEntity(nga.entity('videos'));
	        admin.addEntity(nga.entity('albums'));
	        admin.addEntity(nga.entity('venues'));

	        // configure entities
	        __webpack_require__(22)(nga, admin);
	        __webpack_require__(23)(nga, admin);
	        __webpack_require__(24)(nga, admin);
	        __webpack_require__(25)(nga, admin);
	        __webpack_require__(26)(nga, admin);
	        __webpack_require__(29)(nga, admin);
	        __webpack_require__(32)(nga, admin);

	        //we configurate our menu and add our header
	        admin.menu(__webpack_require__(33)(nga, admin));
	        admin.header(__webpack_require__(34));
	    } else if (window.sessionStorage.getItem(_constants.LOCAL_SUPER_ADMIN) == "true") {}
	    nga.configure(admin);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//our users roles constants
	var AUTH_EVENTS = {
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
	};

	var USER_ROLES = {
	  superAdmin: 'superAdmin_role',
	  admin: 'admin_role',
	  basic: 'basic_role'
	};

	var LOCAL_TOKEN_KEY = 'devdacticIsAwesome';
	var LOCAL_ADMIN = '?';
	var LOCAL_SUPER_ADMIN = '??';
	var LOCAL_USER_ID = 'ze?c';

	exports.AUTH_EVENTS = AUTH_EVENTS;
	exports.USER_ROLES = USER_ROLES;
	exports.LOCAL_TOKEN_KEY = LOCAL_TOKEN_KEY;
	exports.LOCAL_ADMIN = LOCAL_ADMIN;
	exports.LOCAL_SUPER_ADMIN = LOCAL_SUPER_ADMIN;
	exports.LOCAL_USER_ID = LOCAL_USER_ID;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = config;

	var _addPhotoTemplate = __webpack_require__(4);

	var _addPhotoTemplate2 = _interopRequireDefault(_addPhotoTemplate);

	var _addAlbumController = __webpack_require__(5);

	var _addAlbumController2 = _interopRequireDefault(_addAlbumController);

	var _detailPhoto = __webpack_require__(6);

	var _detailPhoto2 = _interopRequireDefault(_detailPhoto);

	var _addVideoTemplate = __webpack_require__(7);

	var _addVideoTemplate2 = _interopRequireDefault(_addVideoTemplate);

	var _addVideoController = __webpack_require__(8);

	var _addVideoController2 = _interopRequireDefault(_addVideoController);

	var _detailVideo = __webpack_require__(9);

	var _detailVideo2 = _interopRequireDefault(_detailVideo);

	var _authController = __webpack_require__(10);

	var _authController2 = _interopRequireDefault(_authController);

	var _login = __webpack_require__(11);

	var _login2 = _interopRequireDefault(_login);

	var _authFactory = __webpack_require__(12);

	var _authFactory2 = _interopRequireDefault(_authFactory);

	var _authService = __webpack_require__(13);

	var _authService2 = _interopRequireDefault(_authService);

	var _signup = __webpack_require__(14);

	var _signup2 = _interopRequireDefault(_signup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function config($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {
	  $httpProvider.interceptors.push(_authFactory2.default);
	  $stateProvider.state('albums', {
	    parent: 'main',
	    url: '/albums/:id',
	    // params: { id: null },
	    controller: _addAlbumController2.default,
	    template: _addPhotoTemplate2.default
	  }).state('detailPhoto', {
	    parent: 'main',
	    url: '/albums/files/:filename',
	    params: { filename: null },
	    controller: _addAlbumController2.default,
	    template: _detailPhoto2.default
	  }).state('login', {
	    // parent: 'main',
	    url: '/login',
	    template: _login2.default,
	    controller: _authController2.default
	  }).state('signup', {
	    // parent: 'main',
	    url: '/signup',
	    template: _signup2.default,
	    controller: _authController2.default
	  }).state('albumsVideo', {
	    parent: 'main',
	    url: '/videos/:id',
	    // params: { id: null },
	    controller: _addVideoController2.default,
	    template: _addVideoTemplate2.default
	  }).state('detailVideo', {
	    parent: 'main',
	    url: '/videos/files/:filename',
	    params: { filename: null },
	    controller: _addVideoController2.default,
	    template: _detailVideo2.default
	  });
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<form  name=\"form\" ng-controller=\"addAlbumController\" >\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"page header\">\n                <h1>Edit album {{albumService.name}}\n                    <ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>\n                </h1>\n                <hr/>\n            </div>\n        </div>\n    </div>\n    <div id=\"row-date_event\" class=\"form-field form-group\">\n        <label for=\"date_event\" class=\"col-sm-2 control-label\">\n        </label>\n        <div class=\"col-sm-10 col-md-8 col-lg-7\">\n            <a class='btn btn-primary' href='javascript:;'>\n                Choose File...\n                <input type=\"file\" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";opacity:0;background-color:transparent;color:transparent;' \n                onchange=\"angular.element(this).scope().filesChanged(this)\"               \n                multiple ngf-select ng-model=\"files\" ngf-multiple=\"true\" file-input=\"files\" name=\"files\"/>\n            </a>  &nbsp;(10 files max)\n        </div>\n    </div><br/><br/>\n    <div class=\"container\"> \n        <div style=\"border-radius: 4px; float: left; border: 1px solid #bbb;  padding: 10px; margin-right: 10px; margin-bottom: 10px\" ng-repeat=\"file in files\">\n            <div class=\"thumbnail\">\n                <div class=\"caption\">\n                    <h3>Album image {{$index +1}}</h3>\n                    <img ngf-src=\"file\" class=\"thumb\" style=\"width:255px;\">\n                    <div style=\"overflow: hidden; white-space: nowrap\"><strong>Name:</strong> {{ file.name }}</div>\n                    <div><strong>Size:</strong> {{ file.size/1024/1024|number:2 }} Mb</div><br/>\n                    <p><a class=\"btn btn-primary\"  style=\"visibility: hidden;\" role=\"button\"{{>Button</a> <a class=\"btn btn-default btn-danger\" ng-click=\"remove(file)\" role=\"button\">Remove</a></p>\n                </div>\n            </div>\n        </div>\n    </div><br/>       \n    <div class=\"form-field form-group\">\n        <label class=\"col-sm-2 control-label\">     \n        </label>\n        <div class=\"col-sm-10 col-md-8 col-lg-7\">\n            <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"upload_photo()\"><span class=\"glyphicon glyphicon-ok\"></span>&nbsp;<span class=\"hidden-xs ng-scope\" translate=\"SAVE_CHANGES\">Save changes</span></button>\n        </div>\n    </div>\n</form>\n<script src=\"ng-file-upload-shim.min.js\"></script>\n<script src=\"ng-file-upload.min.js\"></script>";

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function addAlbumController($scope, $http, $stateParams, notification, $location, $window, $interval) {
	  $scope.files = []; //our list of album file
	  $scope.photoDetail = function () {
	    $scope.filename = $stateParams.filename;
	  };
	  // we watch the url change
	  // if the url contains edit, then we display our form
	  $scope.isEdit = false;
	  $scope.$watch(function () {
	    return $location.path();
	  }, function (value) {
	    if (value.match("edit")) {
	      $scope.isEdit = true;
	    }
	  });

	  // from albumThumbnail, we add our custom button (select all checkbox)
	  // it select and deselect the checkboxes http://localhost:8080/#/albums/edit/57caeb25b616e084304799cc
	  $scope.selectedLabelList = [];
	  var selectedAll_flag = null;
	  $scope.isSelectAll = function (files) {
	    $scope.master = false;
	    $scope.selectedLabelList = [];
	    if (this.master) {
	      this.master = true;
	      selectedAll_flag = true;
	    } else {
	      this.master = false;
	      selectedAll_flag = false;
	    }
	    //we put the element in our array
	    angular.forEach(files, function (file) {
	      $scope.selectedLabelList.push(file);
	    });
	    angular.forEach($scope.selectedLabelList, function (item) {
	      item.Selected = selectedAll_flag;
	    });
	    //we remove the elements in our array
	    //if the highest checkbox have been deselected
	    if (!this.master) {
	      angular.forEach(files, function (file) {
	        var index = $scope.selectedLabelList.indexOf(file);
	        if (index > -1) {
	          $scope.selectedLabelList.splice(index, 1);
	        }
	      });
	    }
	  };

	  $scope.isLabelChecked = function (files) {
	    if (this.file.Selected) {
	      $scope.selectedLabelList.push(this.file);
	      if ($scope.selectedLabelList.length == files.length) {
	        $scope.master = true;
	      } else {
	        //nothing happened
	      }
	    } else {
	      //we have deselected an element so we deselect the higher checkbox
	      var index = $scope.selectedLabelList.indexOf(this.file);
	      $scope.selectedLabelList.splice(index, 1);
	      this.__proto__.master = false;
	    }
	  };

	  $scope.deletePhoto = function (albumID) {
	    var id = albumID;
	    //here we take the photo selected by the user and we delete them
	    $http({
	      method: 'POST',
	      url: 'http://localhost:8888/api/albums/files/' + id,
	      data: $scope.selectedLabelList
	    }).then(function successCallback(response) {
	      if (response.status == 200) {
	        notification.log('Images sucessfully deleted!', { addnCls: 'humane-flatty-success' });
	      } else {
	        notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
	      }
	    }, function errorCallback(response) {
	      notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
	    });
	    $interval(function () {
	      $window.location.reload();
	    }, 500, 1);
	  };

	  $scope.filesChanged = function (element) {
	    angular.forEach(element.files, function (file) {
	      $scope.files.push(file);
	    });
	    $scope.$apply();
	  };

	  $scope.remove = function (file) {
	    console.log(file);
	    var index = $scope.files.indexOf(file);
	    $scope.files.splice(index, 1);
	  };

	  $scope.upload_photo = function () {
	    var uploadUrl = 'http://localhost:8888/api/albums/' + $stateParams.id;
	    var fd = new FormData();
	    angular.forEach($scope.files, function (file) {
	      fd.append('files', file);
	    });
	    $http.post(uploadUrl, fd, {
	      transformRequest: angular.identity,
	      headers: { 'Content-type': undefined }
	    }).then(function successCallback(response) {
	      notification.log('Album sucessfully added!', { addnCls: 'humane-flatty-success' });
	    }, function errorCallback(response) {
	      notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
	    });
	    $interval(function () {
	      $window.location.reload();
	    }, 2000, 1);
	  };
	}

	exports.default = addAlbumController;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n\t<!-- uiView:  -->\r\n\t<div ui-view=\"\" class=\"ng-scope\">\r\n\t\t<div class=\"row ng-scope\">\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>\r\n\t\t\t\t\t<h1>\r\n\t\t\t\t\t\t<span class=\"ng-binding ng-scope\">Detail</span>\r\n\t\t\t\t\t</h1>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"row ng-scope\" id=\"delete-view\">\r\n\t\t\t<div ng-controller=\"photoDetail\" class=\"container\">\r\n\t\t\t\t<!-- ngIf: ::deleteController.description -->\r\n\t\t\t\t<img ng-src=\"http://localhost:8888/api/file/{{filename}}\">\r\n\t\t\t\t<h2><strong>Filename: </strong>{{filename}}</h2>\r\n\t\t\t</div>\r\n\t\t\t<p></p>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<form  name=\"form\" ng-controller=\"addVideoController\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"page header\">\n                <h1>Edit album video {{videoService.name}}\n                    <ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>\n                </h1>\n                <hr/>\n            </div>\n        </div>\n    </div>\n    <div id=\"row-date_event\" class=\"form-field form-group\">\n        <label for=\"date_event\" class=\"col-sm-2 control-label\">\n        </label>\n        <div class=\"col-sm-10 col-md-8 col-lg-7\">\n            <a class='btn btn-primary' href='javascript:;'>\n                Choose File...\n                <input type=\"file\" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";opacity:0;background-color:transparent;color:transparent;' \n                onchange=\"angular.element(this).scope().filesChanged(this)\"               \n                multiple ngf-select ng-model=\"files\" ngf-multiple=\"true\" file-input=\"files\" name=\"files\"/>\n            </a>  &nbsp;(10 files max)\n        </div>\n    </div><br/><br/>\n    <div class=\"container\"> \n        <div style=\"border-radius: 4px; float: left; border: 1px solid #bbb;  padding: 10px; margin-right: 10px; margin-bottom: 10px\" ng-repeat=\"file in files\">\n            <div class=\"thumbnail\">\n                <div class=\"caption\">\n                    <h3>Album video {{$index +1}}</h3>\n                    <img ngf-src=\"file\" class=\"thumb\" style=\"width:255px;\">\n                    <div style=\"overflow: hidden; white-space: nowrap\"><strong>Name:</strong> {{ file.name }}</div>\n                    <div><strong>Size:</strong> {{ file.size/1024/1024|number:2 }} Mb</div><br/>\n                    <p><a class=\"btn btn-primary\"  style=\"visibility: hidden;\" role=\"button\"{{>Button</a> <a class=\"btn btn-default btn-danger\" ng-click=\"remove(file)\" role=\"button\">Remove</a></p>\n                </div>\n            </div>\n        </div>\n    </div><br/>       \n    <div class=\"form-field form-group\">\n        <label class=\"col-sm-2 control-label\">     \n        </label>\n        <div class=\"col-sm-10 col-md-8 col-lg-7\">\n            <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"upload_video()\"><span class=\"glyphicon glyphicon-ok\"></span>&nbsp;<span class=\"hidden-xs ng-scope\" translate=\"SAVE_CHANGES\">Save changes</span></button>\n        </div>\n    </div>\n</form>\n<script src=\"ng-file-upload-shim.min.js\"></script>\n<script src=\"ng-file-upload.min.js\"></script>";

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function addVideoController($scope, $http, $stateParams, notification, $location, $window, $interval) {
	  console.log("on rentre dans le controller");
	  $scope.files = []; //our list of album file
	  $scope.videoDetail = function () {
	    $scope.filename = $stateParams.filename;
	  };
	  // we watch the url change
	  // if the url contains edit, then we display our form
	  $scope.isEdit = false;
	  $scope.$watch(function () {
	    return $location.path();
	  }, function (value) {
	    if (value.match("edit")) {
	      $scope.isEdit = true;
	    }
	  });

	  // from albumThumbnail, we add our custom button (select all checkbox)
	  // it select and deselect the checkboxes http://localhost:8080/#/albums/edit/57caeb25b616e084304799cc
	  $scope.selectedLabelList = [];
	  var selectedAll_flag = null;
	  $scope.isSelectAll = function (files) {
	    $scope.master = false;
	    $scope.selectedLabelList = [];
	    if (this.master) {
	      this.master = true;
	      selectedAll_flag = true;
	    } else {
	      this.master = false;
	      selectedAll_flag = false;
	    }
	    //we put the element in our array
	    angular.forEach(files, function (file) {
	      $scope.selectedLabelList.push(file);
	    });
	    angular.forEach($scope.selectedLabelList, function (item) {
	      item.Selected = selectedAll_flag;
	    });
	    //we remove the elements in our array
	    //if the highest checkbox have been deselected
	    if (!this.master) {
	      angular.forEach(files, function (file) {
	        var index = $scope.selectedLabelList.indexOf(file);
	        if (index > -1) {
	          $scope.selectedLabelList.splice(index, 1);
	        }
	      });
	    }
	  };

	  $scope.isLabelChecked = function (files) {
	    if (this.file.Selected) {
	      $scope.selectedLabelList.push(this.file);
	      if ($scope.selectedLabelList.length == files.length) {
	        $scope.master = true;
	      } else {
	        //nothing happened
	      }
	    } else {
	      //we have deselected an element so we deselect the higher checkbox
	      var index = $scope.selectedLabelList.indexOf(this.file);
	      $scope.selectedLabelList.splice(index, 1);
	      this.__proto__.master = false;
	    }
	  };

	  $scope.deletePhoto = function (albumID) {
	    var id = albumID;
	    //here we take the photo selected by the user and we delete them
	    $http({
	      method: 'POST',
	      url: 'http://localhost:8888/api/albums/files/' + id,
	      data: $scope.selectedLabelList
	    }).then(function successCallback(response) {
	      if (response.status == 200) {
	        notification.log('Images sucessfully deleted!', { addnCls: 'humane-flatty-success' });
	      } else {
	        notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
	      }
	    }, function errorCallback(response) {
	      notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
	    });
	    $interval(function () {
	      $window.location.reload();
	    }, 500, 1);
	  };

	  $scope.filesChanged = function (element) {
	    angular.forEach(element.files, function (file) {
	      $scope.files.push(file);
	    });
	    $scope.$apply();
	  };

	  $scope.remove = function (file) {
	    console.log(file);
	    var index = $scope.files.indexOf(file);
	    $scope.files.splice(index, 1);
	  };

	  $scope.upload_photo = function () {
	    var uploadUrl = 'http://localhost:8888/api/albums/' + $stateParams.id;
	    var fd = new FormData();
	    angular.forEach($scope.files, function (file) {
	      fd.append('files', file);
	    });
	    $http.post(uploadUrl, fd, {
	      transformRequest: angular.identity,
	      headers: { 'Content-type': undefined }
	    }).then(function successCallback(response) {
	      notification.log('Album sucessfully added!', { addnCls: 'humane-flatty-success' });
	    }, function errorCallback(response) {
	      notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
	    });
	    $interval(function () {
	      $window.location.reload();
	    }, 2000, 1);
	  };
	}

	exports.default = addVideoController;
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n\t<!-- uiView:  -->\r\n\t<div ui-view=\"\" class=\"ng-scope\">\r\n\t\t<div class=\"row ng-scope\">\r\n\t\t\t<div class=\"col-lg-12\">\r\n\t\t\t\t<div class=\"page-header\">\r\n\t\t\t\t<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>\r\n\t\t\t\t\t<h1>\r\n\t\t\t\t\t\t<span class=\"ng-binding ng-scope\">Detail</span>\r\n\t\t\t\t\t</h1>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"row ng-scope\" id=\"delete-view\">\r\n\t\t\t<div ng-controller=\"photoVideo\" class=\"container\">\r\n\t\t\t\t<!-- ngIf: ::deleteController.description -->\r\n\t\t\t\t<img ng-src=\"http://localhost:8888/api/file/{{filename}}\">\r\n\t\t\t\t<h2><strong>Filename: </strong>{{filename}}</h2>\r\n\t\t\t</div>\r\n\t\t\t<p></p>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = authController;
	//export default function authController($scope, $state,$uibModal, $log, AuthService, $http,AUTH_EVENTS){
	function authController($scope, AuthService, $state, $http, AUTH_EVENTS, notification, $timeout, $window) {

		$scope.loginCtrl = function () {
			AuthService.login($scope.user).then(function (authenticated) {
				$window.location.href = 'http://localhost:8080/#/dashboard';
				window.location.reload();
				//$state.reload();
				//$timeout(function() {$state.transitionTo('dashboard', {}, {reload: true,notify: true}); }, 3000);
			}, function (err) {
				notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
			});
		};

		$scope.registerCtrl = function () {
			AuthService.register($scope.user).then(function (msg) {
				$state.go('login');
				notification.log('Registration sucessfully sended!', { addnCls: 'humane-flatty-success' });
			}, function (errMsg) {
				notification.log('An error has occured!', { addnCls: 'humane-flatty-error' });
			});
		};

		$scope.logoutCtrl = function () {
			AuthService.logout();
			$state.go('login');
			notification.log('You are now log out!', { addnCls: 'humane-flatty-success' });
		};
	}
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<html lang=\"en\">\r\n\t<head>\r\n\t\t<meta charset=\"utf-8\">\r\n\t\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n\t\t<title>Janus Admin</title>\r\n\t\t<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"./../img/favicon-32x32.png\">\r\n\t\t<link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"./../img/favicon-96x96.png\">\r\n\t\t<link rel=\"stylesheet\" href=\"./../css/vendor-72d47c3353.css\">\r\n\t\t<link rel=\"stylesheet\" href=\"./../css/auth-20116342ad.css\">\r\n\t</head>\r\n\t<body>\r\n\t\t<main class=\"auth-main\">\r\n\t\t\t<div class=\"auth-block\">\r\n\t\t\t\t<h1>Sign in to Janus Admin</h1>\r\n\t\t\t\t<a ui-sref=\"signup\" class=\"auth-link\">New to Janus Admin? Sign up!</a>\r\n\t\t\t\t<form class=\"form-horizontal\" ng-controller=\"authController\">\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Username</label>\r\n\t\t\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t\t\t<!--<input type=\"email\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\">-->\r\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"Username\" ng-model=\"user.username\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\r\n\t\t\t\t\t\t<div class=\"col-sm-10\">\r\n\t\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\" ng-model=\"user.password\">\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t<div class=\"col-sm-offset-2 col-sm-10\">\r\n\t\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-default btn-auth\" ng-click=\"loginCtrl()\">Sign in</button> \r\n\t\t\t\t\t\t\t<a href=\"\" class=\"forgot-pass\">Forgot password?</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t\t<div class=\"auth-sep\">\r\n\t\t\t\t\t<span><span>or Sign in with one click</span></span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<!--<div class=\"al-share-auth\">\r\n\t\t\t\t\t<ul class=\"al-share clearfix\">\r\n\t\t\t\t\t\t<li><i class=\"socicon socicon-facebook\" title=\"Share on Facebook\"></i></li>\r\n\t\t\t\t\t\t<li><i class=\"socicon socicon-twitter\" title=\"Share on Twitter\"></i></li>\r\n\t\t\t\t\t\t<li><i class=\"socicon socicon-google\" title=\"Share on Google Plus\"></i></li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</div>-->\r\n\t\t\t</div>\r\n\t\t</main>\r\n\t</body>\r\n</html>";

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = authFactory;
	function authFactory($rootScope, $q, AUTH_EVENTS, notification) {
		return {
			responseError: function responseError(response) {
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated
				}[response.status], response);
				notification.log('An error has occured!', { addnCls: 'humane-flatty-error' });
				return $q.reject(response);
			}
		};
	}
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AuthService;
	// our authentication service
	function AuthService($http, $q, LOCAL_TOKEN_KEY, LOCAL_ADMIN, LOCAL_SUPER_ADMIN, LOCAL_USER_ID) {

	  var _isAuthenticated = false;
	  var isAdmin = false;
	  var isSuperadmin = false;
	  var authToken;

	  var loadUserCredentials = function loadUserCredentials() {
	    var token = window.sessionStorage.getItem(LOCAL_TOKEN_KEY);
	    if (token) {
	      useCredentials(token);
	    }
	    var admin = window.sessionStorage.getItem(LOCAL_ADMIN);
	    var superadmin = window.sessionStorage.getItem(LOCAL_SUPER_ADMIN);
	  };

	  var storeUserCredentials = function storeUserCredentials(user) {
	    window.sessionStorage.setItem(LOCAL_TOKEN_KEY, user.token);
	    window.sessionStorage.setItem(LOCAL_ADMIN, user.admin);
	    window.sessionStorage.setItem(LOCAL_SUPER_ADMIN, user.superadmin);
	    window.sessionStorage.setItem(LOCAL_USER_ID, user.superadmin);
	    useCredentials(user.token);
	  };

	  var useCredentials = function useCredentials(token) {
	    _isAuthenticated = true;
	    authToken = token;
	    // Set the token as header for your requests!
	    $http.defaults.headers.common.Authorization = authToken;
	  };

	  var destroyUserCredentials = function destroyUserCredentials() {
	    authToken = undefined;
	    _isAuthenticated = false;
	    $http.defaults.headers.common.Authorization = undefined;
	    window.sessionStorage.removeItem(LOCAL_TOKEN_KEY);
	    window.sessionStorage.removeItem(LOCAL_ADMIN);
	    window.sessionStorage.removeItem(LOCAL_SUPER_ADMIN);
	    window.sessionStorage.removeItem(LOCAL_USER_ID);
	  };

	  var register = function register(user) {
	    return $q(function (resolve, reject) {
	      $http.post('http://localhost:8888/api/user-registration', user).then(function (result) {
	        if (result.data.success) {
	          resolve(result.data.msg);
	        } else {
	          reject(result.data.msg);
	        }
	      });
	    });
	  };

	  var login = function login(user) {
	    return $q(function (resolve, reject) {
	      $http.post('http://localhost:8888/api/authenticate', user).then(function (result) {
	        //console.log(result);
	        if (result.data.success) {
	          storeUserCredentials(result.data);
	          resolve(result.data.msg);
	        } else {
	          reject(result.data.msg);
	        }
	      });
	    });
	  };

	  var logout = function logout() {
	    destroyUserCredentials();
	  };

	  loadUserCredentials();

	  return {
	    login: login,
	    register: register,
	    logout: logout,
	    isAuthenticated: function isAuthenticated() {
	      return _isAuthenticated;
	    },
	    isAdmin: function isAdmin() {
	      return window.sessionStorage.getItem(LOCAL_ADMIN);
	    },
	    isSuperadmin: function isSuperadmin() {
	      return window.sessionStorage.getItem(LOCAL_SUPER_ADMIN);
	    }
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n  <title>Janus Admin</title>\r\n\r\n  <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900&subset=latin,greek,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic' rel='stylesheet' type='text/css'>\r\n\r\n  <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"../img/favicon-16x16.png\">\r\n  <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"../img/favicon-32x32.png\">\r\n  <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"../img/favicon-96x96.png\">\r\n    <link rel=\"stylesheet\" href=\"./../css/vendor-72d47c3353.css\">\r\n    <link rel=\"stylesheet\" href=\"./../css/auth-20116342ad.css\">\r\n</head>\r\n<body>\r\n<main class=\"auth-main\">\r\n  <div class=\"auth-block\">\r\n    <h1>Sign up to Janus Admin</h1>\r\n    <a ui-sref=\"login\" class=\"auth-link\">Already have a Janus Admin account? Sign in!</a>\r\n    <form class=\"form-horizontal\" ng-controller=\"authController\">\r\n      <div class=\"form-group\">\r\n        <label for=\"inputName3\" class=\"col-sm-2 control-label\" >Username</label>\r\n        <div class=\"col-sm-10\">\r\n          <input type=\"text\" class=\"form-control\" id=\"inputName3\" placeholder=\"Username\" ng-model=\"user.username\">\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"inputEmail3\" class=\"col-sm-2 control-label\">Email</label>\r\n\r\n        <div class=\"col-sm-10\">\r\n          <input type=\"email\" class=\"form-control\" id=\"inputEmail3\" placeholder=\"Email\" ng-model=\"user.email\">\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"inputPassword3\" class=\"col-sm-2 control-label\">Password</label>\r\n        <div class=\"col-sm-10\">\r\n          <input type=\"password\" class=\"form-control\" id=\"inputPassword3\" placeholder=\"Password\" ng-model=\"user.password\">\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <div class=\"col-sm-offset-2 col-sm-10\">\r\n          <button type=\"submit\" class=\"btn btn-default btn-auth\"  ng-click=\"registerCtrl()\">Sign up</button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n\r\n    <div class=\"auth-sep\"><span><span>or Sign up with one click</span></span></div>\r\n\r\n    <div class=\"al-share-auth\">\r\n      <ul class=\"al-share clearfix\">\r\n        <li><i class=\"socicon socicon-facebook\" title=\"Share on Facebook\"></i></li>\r\n        <li><i class=\"socicon socicon-twitter\" title=\"Share on Twitter\"></i></li>\r\n        <li><i class=\"socicon socicon-google\" title=\"Share on Google Plus\"></i></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</main>\r\n</body>\r\n</html>";

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = runConfig;
	function runConfig($rootScope, AuthService, AUTH_EVENTS, $location) {

		$rootScope.$on('$locationChangeSuccess', function (event) {
			if (AuthService.isAuthenticated() == false && $location.path() != "/signup") {
				$location.path("/login");
			}
		});

		$rootScope.$on(AuthService.isAuthenticated(), function () {
			if (AuthService.isAuthenticated() == false && $location.path() != "/signup") {
				$location.path("/login");
			}
		});
	}
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function albumService($location) {
	    var albumValue = {};
	    albumValue.selectedLabelList = [];
	    return {
	        albumValue: albumValue
	    };
	};
	//for add form value into the template
	exports.default = albumService;
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function videoService($location) {
	    var albumValue = {};
	    albumValue.selectedLabelList = [];
	    return {
	        albumValue: albumValue
	    };
	};
	//for add form value into the template
	exports.default = videoService;
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function editPhoto($location, albumService) {
	    return {
	        restrict: 'E',
	        scope: { album: '&' },
	        link: function link(scope) {
	            //from album we get the entry (our album variables)
	            //and we copy it to our album service
	            angular.copy(scope.album().values, albumService);
	            scope.editAlbum = function () {
	                $location.path('/albums/' + scope.album().values._id);
	            };
	        },
	        template: '<a class="btn btn-default btn-xs" ng-class="size ? \'btn-\' + size : \'\'" ng-click="editAlbum()">\n                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="Edit photos">edit photos</span>\n                </a>'
	    };
	}

	exports.default = editPhoto;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function editVideo($location, videoService) {
	    return {
	        restrict: 'E',
	        scope: { albumVideo: '&' },
	        link: function link(scope) {
	            //from album we get the entry (our album variables)
	            //and we copy it to our album service
	            angular.copy(scope.albumVideo().values, videoService);
	            scope.editVideo = function () {
	                $location.path('/videos/' + scope.albumVideo().values._id);
	            };
	        },
	        template: '<a class="btn btn-default btn-xs" ng-class="size ? \'btn-\' + size : \'\'" ng-click="editVideo()">\n                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="Edit videos">edit videos</span>\n                </a>'
	    };
	}

	exports.default = editVideo;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function fileInput($parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            element.bind('change', function () {
	                $parse(attrs.fileInput).assign(scope, element[0].files);
	                scope.$apply();
	            });
	        }
	    };
	}

	exports.default = fileInput;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function fileInputVideo($parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            element.bind('change', function () {
	                $parse(attrs.fileInput).assign(scope, element[0].files);
	                scope.$apply();
	            });
	        }
	    };
	}

	exports.default = fileInputVideo;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (nga, admin) {

		var truncate = function truncate(value) {
			if (!value) return '';
			return value.length > 50 ? value.substr(0, 50) + '...' : value;
		};

		var users = admin.getEntity('users');
		var companies = admin.getEntity('companies');

		// set the fields of the user entity list view
		users.identifier(nga.field('_id')).listView().fields([nga.field('username'), nga.field('email'),
		// nga.field('password'),
		nga.field('lastname'), nga.field('firstname'), nga.field('company_id', 'reference').label('Company').isDetailLink(true).targetEntity(companies).targetField(nga.field('name').map(truncate)).singleApiCall(function (ids) {
			return { 'id': ids };
		}), nga.field('created_at'), nga.field('updated_at')]).exportFields([nga.field('_id'), nga.field('username'), nga.field('email'), nga.field('password'), nga.field('lastname'), nga.field('firstname'), nga.field('admin', 'boolean'), nga.field('superAdmin', 'boolean'), nga.field('created_at'), nga.field('updated_at')]).listActions(['show', 'edit', 'delete']);

		users.identifier(nga.field('_id')).showView().fields([nga.field('_id').isDetailLink(true), nga.field('username'), nga.field('email'), nga.field('lastname'), nga.field('firstname'), nga.field('company_id', 'reference').label('Company').isDetailLink(true).targetEntity(companies).targetField(nga.field('name').map(truncate)).singleApiCall(function (ids) {
			return { 'id': ids };
		}), nga.field('admin', 'boolean'), nga.field('superAdmin', 'boolean'), nga.field('created_at'), nga.field('updated_at')]);

		users.identifier(nga.field('_id')).editionView().actions(['list', 'show', 'delete']).fields([nga.field('_id').editable(false), nga.field('username'), nga.field('email'), nga.field('password'), nga.field('lastname'), nga.field('firstname'), nga.field('admin', 'boolean'), nga.field('company_id', 'reference').label('Company').targetEntity(companies).targetField(nga.field('name').map(truncate)), nga.field('superAdmin', 'boolean'), nga.field('created_at', 'datetime').editable(false), nga.field('updated_at', 'datetime').editable(true)]);

		users.identifier(nga.field('_id')).creationView().fields([nga.field('username'), nga.field('email'), nga.field('password'), nga.field('lastname'), nga.field('firstname'), nga.field('admin', 'boolean'), nga.field('superAdmin', 'boolean'), nga.field('updated_at', 'datetime').editable(true)]);

		return users;
	};

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
				value: true
	});

	exports.default = function (nga, admin) {

				var companies = admin.getEntity('companies');
				var users = admin.getEntity('users');

				companies.identifier(nga.field('_id')).listView().fields([nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website'), nga.field('created_at', 'datetime'), nga.field('updated_at', 'datetime')]).exportFields([nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website'), nga.field('created_at', 'datetime'), nga.field('updated_at', 'datetime')]).listActions(['show', 'edit', 'delete']);

				companies.identifier(nga.field('_id')).showView().fields([nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website'), nga.field('created_at', 'datetime'), nga.field('updated_at', 'datetime'), nga.field('employees', 'embedded_list').targetFields(users.showView().fields())]);

				companies.identifier(nga.field('_id')).showView().actions(['edit', 'delete']);

				companies.editionView().actions(['list', 'show', 'delete']).fields([nga.field('_id').editable(false), nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website'), nga.field('created_at', 'datetime').editable(false), nga.field('updated_at', 'datetime').editable(true)]);

				companies.identifier(nga.field('_id')).creationView().fields([nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website'), nga.field('created_at', 'datetime').editable(true), nga.field('updated_at', 'datetime').editable(true)]);

				return companies;
	};

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (nga, admin) {
		var events = admin.getEntity('events');
		var categories = admin.getEntity('categories');
		var venues = admin.getEntity('venues');
		var albums = admin.getEntity('albums');

		events.identifier(nga.field('_id')).listView().fields([nga.field('_id').editable(false), nga.field('name'), nga.field('address'), nga.field('categorie_id', 'reference').label('Categorie').targetEntity(categories).targetField(nga.field('event_type')), nga.field('venue_id', 'reference').label('Venue').targetEntity(venues).targetField(nga.field('name')), nga.field('album_id', 'reference').label('Album').targetEntity(albums).targetField(nga.field('name')), nga.field('description'), nga.field('date_event', 'datetime')]).listActions(['show', 'edit', 'delete']);

		events.identifier(nga.field('_id')).showView().fields(events.listView().fields());

		events.creationView().title('Create new Event').fields(nga.field('name'), nga.field('address'), nga.field('description'), nga.field('date_event', 'datetime'));

		events.editionView().fields(events.listView().fields());

		return events;
	};

	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (nga, admin) {

	    var categories = admin.getEntity('categories');

	    categories.identifier(nga.field('_id')).listView().fields([nga.field('_id'), nga.field('event_type').label('type'), nga.field('created_at'), nga.field('updated_at')]).listActions(['<ma-filtered-list-button entity-name="events" filter="{ category_id: entry.values.id }" size="xs" label="Related events"></ma-filtered-list-button>', 'edit', 'delete']);

	    categories.creationView().fields([nga.field('event_type').validation({ required: true }).label('type'), nga.field('', 'template').label('').editable(false).template('<span class="pull-right"><ma-filtered-list-button entity-name="events" filter="{ category_id: entry.values.id }" size="sm"></ma-filtered-list-button></span>')]);

	    categories.editionView().fields(categories.creationView().fields());

	    return categories;
	};

	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (nga, admin) {
		var videos = admin.getEntity('videos');
		videos.identifier(nga.field('_id')).listView().title('Album Videos List').fields([nga.field('name'), nga.field('title'), nga.field('description'), nga.field('date', 'datetime').label('date event')]).listActions(['show', 'edit', 'delete']);

		videos.creationView().title('Create new album videos').fields(videos.listView().fields());

		videos.showView().fields([nga.field('_id'), nga.field('name'), nga.field('title'), nga.field('description'), nga.field('date', 'datetime'), nga.field('Videos').template(__webpack_require__(27)) //<= we override this template
		]);
		//with our custom template videoThumbnail.html, display inside the 'main' template
		//we do the same thing
		videos.editionView().fields(videos.listView().fields(), nga.field('files').label('Videos').template(__webpack_require__(28)));

		return videos;
	};

	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\r\n    <div style=\"border-radius: 4px; float: left; border: 1px solid #bbb;  padding: 10px; margin-right: 10px; margin-bottom: 10px\" ng-repeat=\"file in entry.values.files\">\r\n        <div class=\"thumbnail\">\r\n            <div class=\"caption\">\r\n                <h3>Album video {{$index +1}}</h3>\r\n                <img class=\"thumb\" style=\"width:255px;\" ng-src=\"http://localhost:8888/api/file/{{file.filename}}\"><br/>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\" ng-controller=\"addVideoController\">\r\n\t<div ui-view=\"grid\" ng-if=\"isEdit && entry.values.files.length > 0\">\r\n\t\t<div class=\"show-value cil-sm-10 col-md-9 col-lg-10\"><!-- col-md-8 col-lg-7 --><br/><br/>\r\n\t\t\t<table class=\"grid table table-condensed table-hover table-striped\">\r\n\t\t\t\t<thead>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<th><input type=\"checkbox\" ng-model=\"master\" ng-change=\"isSelectAll(entry.values.files)\"/></th>\r\n\t\t\t\t\t\t<th>Thumbnail</th>\r\n\t\t\t\t\t\t<th>Original name</th>\r\n\t\t\t\t\t\t<th><th>\r\n\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t    <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\" ng-if=\"selectedLabelList.length\">\r\n\t\t\t\t\t      \t\t<button id=\"single-button\" type=\"button\" class=\"btn btn-default dropdown-toggle ng-binding ng-scope\" uib-dropdown-toggle ng-disabled=\"disabled\">\r\n\t\t\t\t\t\t        {{selectedLabelList.length}} Selected <span class=\"caret\"></span>\r\n\t\t\t\t\t\t      \t</button>\r\n\t\t\t\t\t\t      \t<ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\r\n\t\t\t\t\t\t        \t<li role=\"menuitem\"><a ng-click=\"deletePhoto(entry.values._id)\">Delete</a></li>\r\n\t\t\t\t\t\t        \t<!--<li role=\"menuitem\"><a ui-sref=\"removeFiles({ id: entry.values._id })\">Delete</a></li>-->\r\n\t\t\t\t\t\t      \t</ul>\r\n\t\t\t\t\t\t    </div>\r\n\t\t\t\t\t\t</th>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t</thead>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr ng-repeat=\"file in entry.values.files\" class=\"ng-scope\">\r\n\t\t\t\t\t\t<td ><input type=\"checkbox\" ng-model=\"file.Selected\" ng-change=\"isLabelChecked(entry.values.files)\"/>\r\n                \t\t</td>\r\n                \t\t<td>\r\n                \t\t\t<div class=\"ng-isolate-scope\"><div thumbnail=\"http://localhost:8888/api/file/{{file.filename}}\" image=\"http://localhost:8888/api/file/{{file.filename}}\" class=\"ng-scope ng-isolate-scope\"><img ng-src=\"http://localhost:8888/api/file/{{file.filename}}\" class=\"mini_thumbnail\"></div></div>\t\r\n                \t\t</td>\r\n                \t\t<td><td>\r\n                \t\t<td>\t\t\r\n                \t\t\t<button id=\"singlebutton\" type=\"button\" ui-sref=\"detailPhoto({ filename: file.filename })\" name=\"singlebutton\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></i>&nbsp;Details</button> \r\n                \t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table><br/><br/>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class=\"col-md-4 center-block\">\r\n    <button id=\"singlebutton\" name=\"singlebutton\" type=\"button\" class=\"btn btn-primary center-block hidden\">\r\n        Next Step!\r\n    </button>\r\n</div>\r\n<div class=\"col-md-4 text-center\"> \r\n<button id=\"singlebutton\" type=\"button\" name=\"singlebutton\" class=\"btn btn-default\" ng-click=\"addPhotos = !addPhotos\">\r\n\t<i class=\"fa fa-plus fa-1\" aria-hidden=\"true\"></i>&nbsp;Add videos</button> \r\n</div>\r\n<br/><br/><br/><br/>\r\n<div class=\"check-element animate-show\" ng-show=\"addPhotos\" >\r\n\t<form  name=\"form\" ng-controller=\"addVideoController\" >\r\n\t\t<div class=\"col-md-4 center-block\">\r\n\t\t    <button id=\"singlebutton\" name=\"singlebutton\" type=\"button\" class=\"btn btn-primary center-block hidden\">\r\n\t\t        Next Step!\r\n\t\t    </button>\r\n\t\t</div>\r\n\t\t<div class=\"col-md-4 text-center\"> \r\n\t\t\t<a id=\"singlebutton\" href='javascript:;' name=\"singlebutton\" class=\"btn btn-success\">\r\n\t\t\t\t<i class=\"fa fa-picture-o fa-1\" aria-hidden=\"true\"></i>&nbsp;Choose File...\r\n\t            <input type=\"file\" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";opacity:0;background-color:transparent;color:transparent;' onchange=\"angular.element(this).scope().filesChanged(this)\"multiple ngf-select ng-model=\"files\" ngf-multiple=\"true\" file-input=\"files\" name=\"files\"/>\r\n\t\t\t</a>  \r\n\t\t</div><strong style=\"color:green\">(10 files maximum in one time)</strong>\r\n\t\t<div style=\"margin-top: 30px;\"></div>\r\n\t\t<div class=\"container\">\r\n        \t<div style=\"border-radius: 4px; float: left; border: 1px solid #bbb;  padding: 10px; margin-right: 10px; margin-bottom: 10px\" ng-repeat=\"file in files\">\r\n\t            <div class=\"thumbnail\">\r\n\t                <div class=\"caption\">\r\n\t                    <h3>Album video {{$index +1}}</h3>\r\n\t                    <img ngf-src=\"file\" class=\"thumb\" style=\"width:255px;\">\r\n\t                    <div style=\"overflow: hidden; white-space: nowrap\"><strong>Name:</strong> {{ file.name }}</div>\r\n\t                    <div><strong>Size:</strong> {{ file.size/1024/1024|number:2 }} Mb</div><br/>\r\n\t                    <p><a class=\"btn btn-primary\"  style=\"visibility: hidden;\" role=\"button\"{{>Button</a> <a class=\"btn btn-default btn-danger\" ng-click=\"remove(file)\" role=\"button\">Remove</a></p>\r\n\t                </div>\r\n\t            </div>\r\n\t        </div>\r\n\t\t</div><br/>\r\n\t    <div class=\"col-md-4 center-block\">\r\n\t\t    <button id=\"singlebutton\" name=\"singlebutton\" type=\"button\" class=\"btn btn-primary center-block hidden\">\r\n\t\t        Next Step!\r\n\t\t    </button>\r\n\t\t</div>\r\n\t\t<div class=\"col-md-4 text-center\"> \r\n\t\t<button id=\"singlebutton\" type=\"button\" ng-click=\"upload_video()\" name=\"singlebutton\" class=\"btn btn-success\" ng-click=\"addVideos = !addVideos\">\r\n\t\t\t<i class=\"fa fa-plus fa-1\" aria-hidden=\"true\"></i>&nbsp;Send videos</button> \r\n\t\t</div>\r\n\t</form>\r\n</div>\r\n<script src=\"ng-file-upload-shim.min.js\"></script>\r\n<script src=\"ng-file-upload.min.js\"></script>";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (nga, admin) {

		var albums = admin.getEntity('albums');

		albums.identifier(nga.field('_id')).listView().title('Album Photos List').fields([nga.field('name'), nga.field('title'), nga.field('description'), nga.field('date', 'datetime').label('date event')]).listActions(['show', 'edit', 'delete']);
		//.listActions(['show','edit', 'delete','<edit-photo album="entry"></edit-photo>']);

		albums.creationView().title('Create new album photos').fields(albums.listView().fields());

		albums.showView().fields([nga.field('_id'), nga.field('name'), nga.field('title'), nga.field('description'), nga.field('date', 'datetime'), nga.field('Photos').template(__webpack_require__(30)) //<= we override this template
		]);
		//with our custom template albumsThumbnail.html, display inside the 'main' template
		// albums.showView().template("<album></album>"); 
		//we do the same thing
		albums.editionView().fields(albums.listView().fields(), nga.field('files').label('Photos').template(__webpack_require__(31)));
		// albums.editionView().template(require('./images/sendImageTemplate.html'));
		// albums.showView().template(require('./albums/albumThumbnail.html'));
		return albums;
	};

	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\r\n    <div style=\"border-radius: 4px; float: left; border: 1px solid #bbb;  padding: 10px; margin-right: 10px; margin-bottom: 10px\" ng-repeat=\"file in entry.values.files\">\r\n        <div class=\"thumbnail\">\r\n            <div class=\"caption\">\r\n                <h3>Album image {{$index +1}}</h3>\r\n                <img class=\"thumb\" style=\"width:255px;\" ng-src=\"http://localhost:8888/api/file/{{file.filename}}\"><br/>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\" ng-controller=\"addAlbumController\">\n\t<div ui-view=\"grid\" ng-if=\"isEdit && entry.values.files.length > 0\">\n\t\t<div class=\"show-value cil-sm-10 col-md-9 col-lg-10\"><!-- col-md-8 col-lg-7 --><br/><br/>\n\t\t\t<table class=\"grid table table-condensed table-hover table-striped\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th><input type=\"checkbox\" ng-model=\"master\" ng-change=\"isSelectAll(entry.values.files)\"/></th>\n\t\t\t\t\t\t<th>Thumbnail</th>\n\t\t\t\t\t\t<th>Original name</th>\n\t\t\t\t\t\t<th><th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t    <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\" ng-if=\"selectedLabelList.length\">\n\t\t\t\t\t      \t\t<button id=\"single-button\" type=\"button\" class=\"btn btn-default dropdown-toggle ng-binding ng-scope\" uib-dropdown-toggle ng-disabled=\"disabled\">\n\t\t\t\t\t\t        {{selectedLabelList.length}} Selected <span class=\"caret\"></span>\n\t\t\t\t\t\t      \t</button>\n\t\t\t\t\t\t      \t<ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n\t\t\t\t\t\t        \t<li role=\"menuitem\"><a ng-click=\"deletePhoto(entry.values._id)\">Delete</a></li>\n\t\t\t\t\t\t        \t<!--<li role=\"menuitem\"><a ui-sref=\"removeFiles({ id: entry.values._id })\">Delete</a></li>-->\n\t\t\t\t\t\t      \t</ul>\n\t\t\t\t\t\t    </div>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t<tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr ng-repeat=\"file in entry.values.files\" class=\"ng-scope\">\n\t\t\t\t\t\t<td ><input type=\"checkbox\" ng-model=\"file.Selected\" ng-change=\"isLabelChecked(entry.values.files)\"/>\n                \t\t</td>\n                \t\t<td>\n                \t\t\t<div class=\"ng-isolate-scope\"><div thumbnail=\"http://localhost:8888/api/file/{{file.filename}}\" image=\"http://localhost:8888/api/file/{{file.filename}}\" class=\"ng-scope ng-isolate-scope\"><img ng-src=\"http://localhost:8888/api/file/{{file.filename}}\" class=\"mini_thumbnail\"></div></div>\t\n                \t\t</td>\n                \t\t<td><td>\n                \t\t<td>\t\t\n                \t\t\t<button id=\"singlebutton\" type=\"button\" ui-sref=\"detailPhoto({ filename: file.filename })\" name=\"singlebutton\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></i>&nbsp;Details</button> \n                \t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table><br/><br/>\n\t\t</div>\n\t</div>\n</div>\n<div class=\"col-md-4 center-block\">\n    <button id=\"singlebutton\" name=\"singlebutton\" type=\"button\" class=\"btn btn-primary center-block hidden\">\n        Next Step!\n    </button>\n</div>\n<div class=\"col-md-4 text-center\"> \n<button id=\"singlebutton\" type=\"button\" name=\"singlebutton\" class=\"btn btn-default\" ng-click=\"addPhotos = !addPhotos\">\n\t<i class=\"fa fa-plus fa-1\" aria-hidden=\"true\"></i>&nbsp;Add photos</button> \n</div>\n<br/><br/><br/><br/>\n<div class=\"check-element animate-show\" ng-show=\"addPhotos\" >\n\t<form  name=\"form\" ng-controller=\"addAlbumController\" >\n\t\t<div class=\"col-md-4 center-block\">\n\t\t    <button id=\"singlebutton\" name=\"singlebutton\" type=\"button\" class=\"btn btn-primary center-block hidden\">\n\t\t        Next Step!\n\t\t    </button>\n\t\t</div>\n\t\t<div class=\"col-md-4 text-center\"> \n\t\t\t<a id=\"singlebutton\" href='javascript:;' name=\"singlebutton\" class=\"btn btn-success\">\n\t\t\t\t<i class=\"fa fa-picture-o fa-1\" aria-hidden=\"true\"></i>&nbsp;Choose File...\n\t            <input type=\"file\" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";opacity:0;background-color:transparent;color:transparent;' onchange=\"angular.element(this).scope().filesChanged(this)\"multiple ngf-select ng-model=\"files\" ngf-multiple=\"true\" file-input=\"files\" name=\"files\"/>\n\t\t\t</a>  \n\t\t</div><strong style=\"color:green\">(10 files maximum in one time)</strong>\n\t\t<div style=\"margin-top: 30px;\"></div>\n\t\t<div class=\"container\">\n        \t<div style=\"border-radius: 4px; float: left; border: 1px solid #bbb;  padding: 10px; margin-right: 10px; margin-bottom: 10px\" ng-repeat=\"file in files\">\n\t            <div class=\"thumbnail\">\n\t                <div class=\"caption\">\n\t                    <h3>Album image {{$index +1}}</h3>\n\t                    <img ngf-src=\"file\" class=\"thumb\" style=\"width:255px;\">\n\t                    <div style=\"overflow: hidden; white-space: nowrap\"><strong>Name:</strong> {{ file.name }}</div>\n\t                    <div><strong>Size:</strong> {{ file.size/1024/1024|number:2 }} Mb</div><br/>\n\t                    <p><a class=\"btn btn-primary\"  style=\"visibility: hidden;\" role=\"button\"{{>Button</a> <a class=\"btn btn-default btn-danger\" ng-click=\"remove(file)\" role=\"button\">Remove</a></p>\n\t                </div>\n\t            </div>\n\t        </div>\n\t\t</div><br/>\n\t    <div class=\"col-md-4 center-block\">\n\t\t    <button id=\"singlebutton\" name=\"singlebutton\" type=\"button\" class=\"btn btn-primary center-block hidden\">\n\t\t        Next Step!\n\t\t    </button>\n\t\t</div>\n\t\t<div class=\"col-md-4 text-center\"> \n\t\t<button id=\"singlebutton\" type=\"button\" ng-click=\"upload_photo()\" name=\"singlebutton\" class=\"btn btn-success\" ng-click=\"addPhotos = !addPhotos\">\n\t\t\t<i class=\"fa fa-plus fa-1\" aria-hidden=\"true\"></i>&nbsp;Send photos</button> \n\t\t</div>\n\t</form>\n</div>\n<script src=\"ng-file-upload-shim.min.js\"></script>\n<script src=\"ng-file-upload.min.js\"></script>";

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (nga, admin) {

		var venues = admin.getEntity('venues');
		var events = admin.getEntity('events');
		var albums = admin.getEntity('albums');

		venues.identifier(nga.field('_id')).listView().fields([nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website'), nga.field('album_id', 'reference').label('Album').targetEntity(albums).targetField(nga.field('name'))]).exportFields(venues.listView().fields()).listActions(['show', 'edit', 'delete']);

		venues.creationView().fields([nga.field('name'), nga.field('email'), nga.field('address'), nga.field('codePostal'), nga.field('phone'), nga.field('website')]);

		venues.editionView().fields(venues.listView().fields());

		venues.showView().fields(venues.listView().fields(), nga.field('events', 'embedded_list').targetFields(events.showView().fields()));

		return events;
	};

	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (nga, admin) {
		var users = admin.getEntity('users');
		var companies = admin.getEntity('companies');
		var venues = admin.getEntity('venues');
		var categories = admin.getEntity('categories');
		var events = admin.getEntity('events');
		var albums = admin.getEntity('albums');
		var videos = admin.getEntity('videos');

		return nga.menu().addChild(nga.menu().title('Events').icon('<span class="fa fa-th-list fa-fw"></span>').active(function (path) {
			return path.indexOf('/categories') === 0;
		}).addChild(nga.menu(categories)).icon('<span class="fa fa-picture-o fa-fw"></span>').addChild(nga.menu(events)).icon('<span class="fa fa-tags fa-fw"></span>')).addChild(nga.menu().title('Medias').icon('<span class="fa fa-th-list fa-fw"></span>').active(function (path) {
			return path.indexOf('/albums') === 0;
		})
		/*.addChild(nga.menu(photos))
	 .icon('<span class="fa fa-file-picture-o fa-fw"></span>')  */
		.addChild(nga.menu(albums).title('Photo')).icon('<span class="fa fa-file-picture-o fa-fw"></span>')
		/*.addChild(nga.menu(videos))
	 .icon('<span class="fa  fa-file-video-o fa-fw"></span>') à faire plus tard...*/
		).addChild(nga.menu(users).icon('<span class="fa fa-users fa-fw"></span>')).addChild(nga.menu(companies).icon('<span class="fa fa-user-times fa-fw"></span>')).addChild(nga.menu(venues).icon('<span class="fa fa-institution fa-fw"></span>'));
	};

	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div class=\"navbar-header\">\r\n    <button type=\"button\" class=\"navbar-toggle\">\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n    </button>\r\n    <a class=\"navbar-brand\" href=\"#\" >Janus Admin</a>\r\n</div>\r\n<ul class=\"nav navbar-top-links navbar-right hidden-xs\">\r\n    <li>\r\n        <a href=\"https://github.com/marmelab/ng-admin-demo\">\r\n            <i class=\"fa fa-github fa-lg\"></i>&nbsp;Source\r\n        </a>\r\n    </li>\r\n    <li class=\"dropdown\" dropdown>\r\n            <!-- Single button -->\r\n    <div class=\"btn-group\" uib-dropdown is-open=\"status.isopen\">\r\n      <a id=\"single-button\" class=\"dropdown-toggle\" uib-dropdown-toggle ng-disabled=\"disabled\">\r\n        <i class=\"fa fa-user fa-lg\"></i>&nbsp;theo&nbsp;<i class=\"fa fa-caret-down\"></i>\r\n      </a>\r\n      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\r\n        <li role=\"menuitem\"><a href=\"#\">Settings</a></li>\r\n        <li role=\"menuitem\"><a href=\"#\">Contact Administrator</a></li>\r\n        <li class=\"divider\"></li>\r\n        <li role=\"menuitem\"><a ng-controller =\"authController\" ng-click=\"logoutCtrl()\">Logout</a></li>\r\n      </ul>\r\n    </div>\r\n        <!--<a class=\"dropdown-toggle\" href=\"#\" aria-expanded=\"true\" dropdown-toggle>\r\n            <i class=\"fa fa-user fa-lg\"></i>&nbsp;theo&nbsp;<i class=\"fa fa-caret-down\"></i>\r\n        </a>\r\n        <ul class=\"dropdown-menu dropdown-user\" role=\"menu\">\r\n            <li><a href=\"#\" onclick=\"logout()\"><i class=\"fa fa-sign-out fa-fw\"></i> Logout</a></li>\r\n        </ul>-->\r\n    </li>\r\n</ul>";

/***/ },
/* 35 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);