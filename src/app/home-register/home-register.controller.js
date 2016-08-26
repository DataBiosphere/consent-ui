(function () {
    'use strict';

    angular.module('cmHomeRegister')
        .controller('HomeRegister', HomeRegister);

    /* ngInject */
    function HomeRegister(cmUserService, $rootScope, clientId, $scope, USER_ROLES, cmLoginUserService, $state) {
       $scope.form =  {};

       $rootScope.loadScript('https://apis.google.com/js/platform.js?v=' + Math.random(), 'text/javascript', 'utf-8');
       window.onLoadCallback = function () {
          gapi.auth2.getAuthInstance().signOut();
          gapi.load('auth2', function () {
              if (gapi.auth2.getAuthInstance() === null) {
                 gapi.auth2.init({
                     client_id: clientId
                 });
              }
          });
       };

    function onSignIn(googleUser) {
       $rootScope.accessToken = googleUser.getAuthResponse().access_token;
       var user = getUser();
       cmUserService.registerUser(user).$promise.then(
          function (data) {
            $rootScope.setCurrentUser(data);
            $state.go('researcher_profile');
          }, function () {
             alert("User already exists.");
             $state.go('login');
          });
    }

    function getUser(){
      var role = {};
      var user = {};
      user.roles = [];
      role.name = USER_ROLES.researcher;
      user.roles.push(role);
      user.displayName = $scope.form.name;
      return user;
    }

    window.onSignIn = onSignIn;
    window.onbeforeunload = function(){
      gapi.auth2.getAuthInstance().signOut();
    };


}

})();
