(function () {

    'use strict';

    angular.module('ConsentManagement')
        .controller('ApplicationController', ApplicationController)
        .factory('OAuth2Interceptor', OAuth2Interceptor)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('OAuth2Interceptor');
        });

    function OAuth2Interceptor($rootScope, ontologyApiUrl) {
        return {
            'request': function (config) {
                if ($rootScope && config.url.indexOf(ontologyApiUrl) === -1) {
                    config.headers.Authorization = 'Bearer ' + $rootScope.accessToken;
                }
                return config;
            }
        };
    }

    /* ngInject */
   function ApplicationController($rootScope, USER_ROLES , clientId) {
        $rootScope.clientId = clientId;
        $rootScope.currentUser = null;
        $rootScope.userRoles = USER_ROLES;
        $rootScope.setCurrentUser = function (user) {
            $rootScope.currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            var i = user.roles.length;
            while (i--) {
                user.roles[i].name = user.roles[i].name.toUpperCase();
            }
        };


        $rootScope.loadScript = function (url, type, charset) {
            if (type === undefined) {type = 'text/javascript';}
            if (url) {
                var script = document.querySelector("script[src*='" + url + "']");
                if (!script) {
                    var heads = document.getElementsByTagName("head");
                    if (heads && heads.length) {
                        var head = heads[0];
                        if (head) {
                            script = document.createElement('script');
                            script.setAttribute('src', url);
                            script.setAttribute('type', type);
                            if (charset) {script.setAttribute('charset', charset);
                            head.appendChild(script);}
                        }
                    }
                }
                return script;
            }
        };
    }


    angular.module('ConsentManagement').run(function ($location, $rootScope, $state, cmAuthenticateService, cmLoginUserService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            var authorizedRoles = next.data.authorizedRoles;

            if ($rootScope.currentUser === null) {
                if (sessionStorage.getItem('currentUser') !== null && $state.current.name === "") {
                    cmLoginUserService.refreshUser();
                } else if (next.name !== "login") {
                    event.preventDefault();
                    $location.path("/login");
                }
            } else if ($state.current.name !== "login") {
                if (!cmAuthenticateService.isAuthorized(authorizedRoles, $rootScope.currentUser.roles)) {
                    event.preventDefault();
                }
            }
        });
    });
})();
