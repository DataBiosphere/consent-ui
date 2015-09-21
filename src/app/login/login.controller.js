(function () {
        'use strict';

        angular.module('cmLogin')
            .controller('Login', Login);

        /* ngInject */
        function Login(cmLoginUserService,$rootScope) {

            $rootScope.loadScript('https://apis.google.com/js/platform.js', 'text/javascript', 'utf-8');

            function onSignIn(googleUser) {
                var profile = googleUser.getBasicProfile();
                var accessToken = googleUser.wc.access_token;
                cmLoginUserService.loginUser(profile.getEmail(), accessToken);
            }

            function signOut() {
                cmLoginUserService.logoutUser();

            }

            window.signOut = signOut;
            window.onSignIn = onSignIn;
        }
    }
)();
