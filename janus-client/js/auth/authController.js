//export default function authController($scope, $state,$uibModal, $log, AuthService, $http,AUTH_EVENTS){
export default function authController($scope, AuthService, $state, $http, AUTH_EVENTS, notification,$timeout,$window){

	$scope.loginCtrl = function () {
		AuthService.login($scope.user).then(function(authenticated) {
			$window.location.href = 'http://localhost:8080/#/dashboard';
			window.location.reload();
			//$state.reload();
			//$timeout(function() {$state.transitionTo('dashboard', {}, {reload: true,notify: true}); }, 3000);
		}, function(err) {
			notification.log('An error has occured', { addnCls: 'humane-flatty-error' });
		});
	}

	$scope.registerCtrl = function (){
		AuthService.register($scope.user).then(function(msg) {
			$state.go('login');
			notification.log('Registration sucessfully sended!', { addnCls: 'humane-flatty-success' });
		}, function(errMsg) {
			notification.log('An error has occured!', { addnCls: 'humane-flatty-error' });
		});
	}

	$scope.logoutCtrl = function () {
		AuthService.logout();
		$state.go('login');
		notification.log('You are now log out!', { addnCls: 'humane-flatty-success' });
	}

}
