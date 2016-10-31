import addPhotoTemplate from './albums/addPhotoTemplate.html';
import addAlbumController from './albums/addAlbumController.js';
import del from './detailPhoto.html';
import addVideoTemplate from './videos/addVideoTemplate.html';
import addVideoController from './videos/addVideoController.js';
import delVideo from './detailVideo.html';
import AuthCtrl from './auth/authController.js';
import login from './auth/login.html';
import AuthInterceptor from './auth/authFactory.js';
import AuthService from './auth/authService.js';
import signup from './auth/signup.html';

export default function config($stateProvider, $urlRouterProvider, USER_ROLES, $httpProvider) {
  $httpProvider.interceptors.push(AuthInterceptor);
  $stateProvider.state('albums', {
    parent: 'main',
    url: '/albums/:id',
       // params: { id: null },
       controller: addAlbumController,
       template: addPhotoTemplate
  })
  .state('detailPhoto', {
    parent: 'main',
    url: '/albums/files/:filename',
    params: { filename: null },
    controller: addAlbumController,
    template: del
  })
  .state('login', {
       // parent: 'main',
       url: '/login',
       template: login,
       controller: AuthCtrl
  })    
  .state('signup', {
       // parent: 'main',
       url: '/signup',
       template: signup,
       controller: AuthCtrl
  })
  .state('albumsVideo', {
    parent: 'main',
    url: '/videos/:id',
       // params: { id: null },
       controller: addVideoController,
       template: addVideoTemplate
  })
  .state('detailVideo', {
    parent: 'main',
    url: '/videos/files/:filename',
    params: { filename: null },
    controller: addVideoController,
    template: delVideo
  });
}



