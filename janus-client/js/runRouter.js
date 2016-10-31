export default function runConfig ($rootScope, AuthService, AUTH_EVENTS,$location) {

	$rootScope.$on('$locationChangeSuccess', function(event){
		if (AuthService.isAuthenticated()==false && $location.path()!="/signup" ){
	      $location.path("/login");
	  	}
	})

	$rootScope.$on(AuthService.isAuthenticated(),function(){
		if (AuthService.isAuthenticated()==false && $location.path()!="/signup"){
	      $location.path("/login");
	  	}
	})
	
}