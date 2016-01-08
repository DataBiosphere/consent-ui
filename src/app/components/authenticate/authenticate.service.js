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

        return {
            isAuthorized: function (authorizedRoles, userRoles) {
                return isAuthorized(authorizedRoles, userRoles);
            }
        };
    }
})();

