// our authentication service
export default function AuthService ($http,$q,LOCAL_TOKEN_KEY, LOCAL_ADMIN, LOCAL_SUPER_ADMIN, LOCAL_USER_NAME) {

  var isAuthenticated = false;
  var isAdmin = false;
  var isSuperadmin = false;
  var authToken;
  var username;

  var loadUserCredentials = function () {
    var token = window.sessionStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
    var admin = window.sessionStorage.getItem(LOCAL_ADMIN);
    var superadmin = window.sessionStorage.getItem(LOCAL_SUPER_ADMIN);
    var username = window.sessionStorage.getItem(LOCAL_USER_NAME);
  }

  var storeUserCredentials = function (user) {
    window.sessionStorage.setItem(LOCAL_TOKEN_KEY, user.token);
    window.sessionStorage.setItem(LOCAL_ADMIN, user.admin);
    window.sessionStorage.setItem(LOCAL_SUPER_ADMIN, user.superadmin);
    window.sessionStorage.setItem(LOCAL_USER_NAME, user.username);
    useCredentials(user.token);
  }

  var useCredentials = function (token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  var destroyUserCredentials = function () {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.sessionStorage.removeItem(LOCAL_TOKEN_KEY);
    window.sessionStorage.removeItem(LOCAL_ADMIN);
    window.sessionStorage.removeItem(LOCAL_SUPER_ADMIN);
    window.sessionStorage.removeItem(LOCAL_USER_NAME);
  }

  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post('http://localhost:8888/api/user-registration', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post('http://localhost:8888/api/authenticate', user).then(function(result) {
        console.log(result);
        if (result.data.success) {        
          storeUserCredentials(result.data);
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    isAdmin: function() {return window.sessionStorage.getItem(LOCAL_ADMIN);},
    isSuperadmin: function() {return  window.sessionStorage.getItem(LOCAL_SUPER_ADMIN);},
    username : function () {return window.sessionStorage.getItem(LOCAL_SUPER_NAME);}
  };
}

