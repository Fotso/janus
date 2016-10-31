import {AUTH_EVENTS, USER_ROLES, LOCAL_TOKEN_KEY, LOCAL_ADMIN, LOCAL_SUPER_ADMIN, LOCAL_USER_NAME} from './../config/constants.js';
import config from './configRouter.js';
import runConfig from './runRouter.js';
import {loginCtrl, registerCtrl,logoutCtrl} from './auth/authController';
import {menu_admin, menu_superAdmin, menu_visitor} from './menu.js'
import venue_superAdmin from './venues/config';

// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin','ui.router']);
//some constantes
myApp.constant('AUTH_EVENTS', AUTH_EVENTS);
myApp.constant('USER_ROLES', USER_ROLES);
myApp.constant('LOCAL_TOKEN_KEY', LOCAL_TOKEN_KEY);
myApp.constant('LOCAL_ADMIN', LOCAL_ADMIN);
myApp.constant('LOCAL_SUPER_ADMIN', LOCAL_SUPER_ADMIN);
myApp.constant('LOCAL_USER_NAME', LOCAL_USER_NAME);

//adding custom routing
//we link our custom button with our template
myApp.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', require('./auth/authFactory.js')]);
myApp.config(config);
myApp.run(runConfig);
//custom auth service for the login, logout, registration operations
myApp.service('AuthService', [ '$http', '$q','LOCAL_TOKEN_KEY', 'LOCAL_ADMIN', 'LOCAL_SUPER_ADMIN', 'LOCAL_USER_NAME', require('./auth/authService.js')]);
//custom album service, we put the data from the entry into our template
myApp.service('albumService', ['$location', require('./albums/albumService.js')]);
myApp.service('videoService', ['$location', require('./videos/videoService.js')]);
//custom directive to link our edit button to our template
myApp.directive('editPhoto',['$location','albumService', require('./albums/editPhoto.js')]);
myApp.directive('editVideo',['$location','videoService', require('./videos/editVideo.js')]);
//myApp.directive('deleteFile',['$location','albumService', require('./albums/deleteFile.js')]);
myApp.directive('fileInput',['$parse', require('./albums/fileInput.js')]);
myApp.directive('fileInputVideo',['$parse', require('./videos/fileInputVideo.js')]);
myApp.controller('authController', ['$scope', 'AuthService', '$state', '$http', 'AUTH_EVENTS','notification', '$timeout','$window', require('./auth/authController')]);
//myApp.controller('authController', ['$scope', '$state', '$uibModal', '$log', 'AuthService', '$http', 'AUTH_EVENTS',require('./auth/authController')]);
myApp.controller('addAlbumController',['$scope','$http','$stateParams','notification','$location','$window','$interval', require('./albums/addAlbumController.js')]);
myApp.controller('addVideoController',['$scope','$http','$stateParams','notification','$location','$window','$interval', require('./videos/addVideoController.js')]);
myApp.controller('headerController',['$scope','LOCAL_USER_NAME', require('./header/headerController.js')]);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    var truncate = function (value) {
        if (!value) return '';
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
    };
    // create an admin application
    var admin = nga.application('Janus Admin')
      .baseApiUrl('http://127.0.0.1:8888/api/'); // main API endpoint
        //if the user is login as super admin
    //then we render a superadmin interface
    if(window.sessionStorage.getItem(LOCAL_SUPER_ADMIN)=="true"){
        //add entities
        admin.addEntity(nga.entity('users'));
        admin.addEntity(nga.entity('events'));
        admin.addEntity(nga.entity('categories'));
        admin.addEntity(nga.entity('companies'));
        admin.addEntity(nga.entity('albums'));
        admin.addEntity(nga.entity('venues'));

        // configure entities
        require('./users/config')(nga, admin);
        require('./companies/config')(nga, admin);
        require('./events/config')(nga, admin);
        require('./categories/config')(nga, admin);
        require('./albums/config')(nga, admin);
        require('./venues/config')(nga, admin);
        admin.menu(menu_superAdmin(nga, admin));
    }else if(window.sessionStorage.getItem(LOCAL_ADMIN)=="true"){
        //add entities
        admin.addEntity(nga.entity('users'));
        admin.addEntity(nga.entity('events'));
        admin.addEntity(nga.entity('categories'));
        admin.addEntity(nga.entity('companies'));
        admin.addEntity(nga.entity('albums'));
        admin.addEntity(nga.entity('venues'));

        // configure entities
        require('./users/config')(nga, admin);
    //    require('./companies/config')(nga, admin);
        require('./events/config')(nga, admin);
        require('./categories/config')(nga, admin);
        require('./albums/config')(nga, admin);
        require('./venues/config_admin')(nga, admin);
        admin.menu(menu_admin(nga, admin));
    }
        admin.header(require('./header/header.html'));
        nga.configure(admin);
}]);
