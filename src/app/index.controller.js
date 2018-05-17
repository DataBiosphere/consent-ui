(function () {

    'use strict';

    angular.module('ConsentManagement')
        .controller('ApplicationController', ApplicationController)
        .config(function ($httpProvider, $provide) {
            $provide.factory('UnauthorizedInterceptor', function UnauthorizedInterceptor($rootScope, $q) {
                return {
                    'response': function (response) {
                        return response;
                    },
                    'responseError': function (rejection) {
                        if (rejection.status === 401 || rejection.status === -1) {
                            $rootScope.logout();
                        }
                        return $q.reject(rejection);
                    }
                };
            });

            $provide.factory('OAuth2Interceptor', function OAuth2Interceptor($rootScope, ontologyApiUrl) {
                return {
                    'request': function (config) {
                        if ($rootScope && config.url.indexOf(ontologyApiUrl) === -1) {
                            config.headers.Authorization = 'Bearer ' + $rootScope.accessToken;
                        } else {
                            delete config.headers.Pragma;
                            delete config.headers['Cache-Control'];
                            delete config.headers.Expires;
                        }
                        return config;
                    }
                };
            });

            $httpProvider.interceptors.push('OAuth2Interceptor');
            $httpProvider.interceptors.push('UnauthorizedInterceptor');
        }

        );


    /* ngInject */
    function ApplicationController($rootScope, USER_ROLES, clientId, cmLoginUserService) {
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

        $rootScope.hasRole = function(role) {
            return ($rootScope.currentUser.roles.filter(function(r) {return r.name === role;}).length > 0);
        };

        $rootScope.loadScript = function (url, type, charset) {
            if (type === undefined) { type = 'text/javascript'; }
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
                            if (charset) {
                                script.setAttribute('charset', charset);
                                head.appendChild(script);
                            }
                        }
                    }
                }
                return script;
            }
        };
        $rootScope.logout = function () {
            cmLoginUserService.logoutUser();
        };
    }


    angular.module('ConsentManagement').run(function ($location, $rootScope, $state, cmAuthenticateService, cmLoginUserService) {
        $rootScope.$on('$stateChangeStart', function (event, next, toParams) {
            var authorizedRoles = next.data.authorizedRoles;
            if ($rootScope.currentUser === null) {
                if(next.name === "home" || next.name === "home_help" || next.name === "home_about"|| next.name === "home_register") {
                       return;
                }
                else if(sessionStorage.getItem('currentUser') !== null && $state.current.name === "") {
                    cmLoginUserService.refreshUser();
                    $state.go(next.name, toParams);
                } else if (next.name !== "login") {
                    event.preventDefault();
                    $rootScope.returnToState = next.name;
                    $rootScope.returnToStateAuthorizedRoles = authorizedRoles;
                    $rootScope.returnToStateParams = toParams;
                    $state.go("login");
                }
            } else if ($state.current.name !== "login") {
                if (!cmAuthenticateService.isAuthorized(authorizedRoles, $rootScope.currentUser.roles)) {
                    event.preventDefault();
                }
            }
        });

        $rootScope.$on('$stateChangeError', function (evt, toState){
            switch(toState.name){
                case ("access_review" || "access_review_results" || "final_access_review_results"):
                    $state.go("access_review_not_found");
                    break;
                case ("dul_review" || "dul_review_results"):
                    $state.go("dul_review_not_found");
                    break;
                default:
                    $state.go("not_found");
                    break;
            }
        });
    });
})();
