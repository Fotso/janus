//our users roles constants
const AUTH_EVENTS = {
  	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
}

const USER_ROLES = {
	superAdmin: 'superAdmin_role',
  	admin: 'admin_role',
  	basic: 'basic_role'
}

const LOCAL_TOKEN_KEY = 'devdacticIsAwesome';
const LOCAL_ADMIN = '?';
const LOCAL_SUPER_ADMIN = '??';
const LOCAL_USER_NAME = 'ze?c';

export {AUTH_EVENTS, USER_ROLES, LOCAL_TOKEN_KEY, LOCAL_ADMIN, LOCAL_SUPER_ADMIN, LOCAL_USER_NAME};