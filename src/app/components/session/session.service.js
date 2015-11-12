(function () {
    'use strict';

    angular.module('cmSession')
        .service('cmLoginUserService', cmLoginUserService);

    /* ngInject */
    function cmLoginUserService($rootScope, $location, GetUserResource, USER_ROLES, $state, cmAuthenticateService) {


        function loginUser(email, accessToken) {
            $rootScope.accessToken = accessToken;
            GetUserResource.get({email: email},
                function (data) {
                    $rootScope.setCurrentUser(data);
                    redirect(data);
                }, function (error) {
                    if (error.status === 404) {
                        alert(email + " is not a registered user.");
                        logoutUser();
                    }
                });
        }


        function redirect(data) {
            if (cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, data.roles)) {
                $state.go('chair_console');
            } else if (cmAuthenticateService.isAuthorized(USER_ROLES.member, data.roles)) {
                $state.go('user_console');
            } else if (cmAuthenticateService.isAuthorized(USER_ROLES.admin, data.roles)) {
                $state.go('admin_console');
            } else if (cmAuthenticateService.isAuthorized(USER_ROLES.researcher, data.roles)) {
                $state.go('researcher_console');
            } else if (cmAuthenticateService.isAuthorized(USER_ROLES.alumni, data.roles)) {
                $state.go('summary_votes');
            } else {
                alert("not valid Role");
                logoutUser();
            }
        }

        function redirectToSpecificPage(){

        }

        function refreshUser() {
            $rootScope.setCurrentUser(JSON.parse(sessionStorage.getItem('currentUser')));
            $rootScope.loadScript('https://apis.google.com/js/platform.js?onload=onLoadCallback', 'text/javascript', 'utf-8');
            window.onLoadCallback = function () {
                gapi.load('auth2', function () {
                    if (gapi.auth2.getAuthInstance() === null) {
                        gapi.auth2.init({
                            client_id: '806222273987-o5v929322h518gsoli74vem9rq7iqg09.apps.googleusercontent.com'
                        });
                    }
                });
            };
            function signOut() {
                logoutUser();
            }

            window.signOut = signOut;
        }


        function logoutUser() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
                .then(function () {
                    sessionStorage.clear();
                    $rootScope.currentUser = null;
                    $location.path("/login");
                    $rootScope.$apply();
                });
        }

        return {
            loginUser: function (email, accessToken) {
                return loginUser(email, accessToken);
            },
            logoutUser: function () {
                return logoutUser();
            },
            refreshUser: function () {
                return refreshUser();
            },
            redirect: function (data) {
                return redirect(data);
            }

        };
    }
})();
