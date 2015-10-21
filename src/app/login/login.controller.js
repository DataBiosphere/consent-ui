(function () {
        'use strict';

        angular.module('cmLogin')
            .controller('Login', Login);

        /* ngInject */
        function Login(cmLoginUserService,$rootScope) {

            $rootScope.loadScript('https://apis.google.com/js/platform.js?v='+ Math.random() , 'text/javascript', 'utf-8');
            window.onLoadCallback = function(){
                                 gapi.load('auth2', function() {
                                        if (gapi.auth2.getAuthInstance() === null ){
                                                  gapi.auth2.init({
                                                  client_id: '806222273987-o5v929322h518gsoli74vem9rq7iqg09.apps.googleusercontent.com'
                                              });
                                        }
                                   });
                                }



            function onSignIn(googleUser) {
                var profile = googleUser.getBasicProfile();
                var accessToken = googleUser.po.access_token;
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
