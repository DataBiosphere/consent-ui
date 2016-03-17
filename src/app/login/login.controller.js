(function () {
    'use strict';

    angular.module('cmLogin')
        .controller('Login', Login);

    /* ngInject */
    function Login(cmLoginUserService, $rootScope, clientId) {

        $rootScope.loadScript('https://apis.google.com/js/platform.js?v=' + Math.random(), 'text/javascript', 'utf-8');
        window.onLoadCallback = function () {
            gapi.load('auth2', function () {
                if (gapi.auth2.getAuthInstance() === null) {
                    gapi.auth2.init({
                        client_id: clientId
                    });
                }
            });
        };


        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            var accessToken = googleUser.getAuthResponse().access_token;
            cmLoginUserService.loginUser(profile.getEmail(), accessToken);
        }

        function signOut() {
            cmLoginUserService.logoutUser();

        }

        function onLoad() {
            gapi.load('auth2', function() {
                gapi.auth2.init();
            });
        }

        window.signOut = signOut;
        window.onSignIn = onSignIn;

    }
})();
