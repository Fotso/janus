export default function headerController($scope, LOCAL_USER_NAME){
	$scope.username ="";
	$scope.username = window.sessionStorage.getItem(LOCAL_USER_NAME);
}