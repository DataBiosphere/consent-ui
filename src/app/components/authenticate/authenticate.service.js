(function () {
    'use strict';

    angular.module('cmAuthenticate')
        .service('cmAuthenticateService', cmAuthenticateService);

    /* ngInject */
    function cmAuthenticateService(USER_ROLES) {

        function isAuthorized(authorizedRoles, userRoles) {
            var i = userRoles.length;
            while (i--) {
                if (authorizedRoles[i] === USER_ROLES.all || (authorizedRoles.indexOf(userRoles[i].name) !== -1))  {
                    return true;
                }
            }
            return false;
        }

        function hasValidRole(authorizedRoles, userRoles){
            var uRolesCount = userRoles.length;
            var authRolesCount = authorizedRoles.length;
            while(authRolesCount--){
                var i = uRolesCount;
                while(i--){
                    if (userRoles[i] === USER_ROLES.all || (userRoles[i].name === authorizedRoles[authRolesCount]))  {
                        return true;
                    }
                }
            }
            return false;
        }

        return {
            isAuthorized: function (authorizedRoles, userRoles) {
                return isAuthorized(authorizedRoles, userRoles);
            },
            hasValidRole: function(authorizedRoles, userRoles){
                return hasValidRole(authorizedRoles, userRoles);
            }
        };
    }
})();

