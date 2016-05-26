(function () {
    'use strict';

    angular.module('cmUser')
        .service('cmUserService', cmUserService);

    /* ngInject */
    function cmUserService(UserResource, GetUserResource, UpdateUserResource, validateUserDelegationResource) {


        function getUserByEmail(email) {
            return GetUserResource.get({email: email}).$promise;
        }

        function getUsers() {
            return UserResource.List().$promise;
        }

        function postUser(user) {
            return UserResource.post(user);

        }

        function updateUser(user) {
            return UpdateUserResource.update({userId: user.updatedUser.dacUserId}, user);
        }

        function validateDelegation(role,dacUser) {
                    return validateUserDelegationResource.post({role: role}, dacUser);
        }

        return {
            findUser: function (email) {
                return getUserByEmail(email);
            },

            findUsers: function () {
                return getUsers();
            },

            postUser: function (user) {
                return postUser(user);
            },

            updateUser: function (user) {
                return updateUser(user);
            },
            validateDelegation: function(role,user) {
                return validateDelegation(role,user);
            }
        };
    }

})();
