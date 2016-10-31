export default function authFactory ($rootScope, $q, AUTH_EVENTS, notification) {
	return {
		responseError: function (response) {
			$rootScope.$broadcast({
				401: AUTH_EVENTS.notAuthenticated,
			}[response.status], response);
			notification.log('An error has occured!', { addnCls: 'humane-flatty-error' });
			return $q.reject(response);
		}
	};
}