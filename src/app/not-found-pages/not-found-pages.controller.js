(function () {

    'use strict';

    angular.module('cmNotFound')
        .controller('NotFoundController', NotFoundController);

    /* ngInject */
    function NotFoundController($rootScope, $scope, $state, USER_ROLES, electionTypeObject, cmAuthenticateService) {

        $scope.isAccessElection = electionTypeObject.electionType === "DataAccess";
        $scope.isDataUseLimitations = electionTypeObject.electionType === "DataUseLimitations";

        $scope.goToConsole = function () {
            $scope.isChair = cmAuthenticateService.isAuthorized(USER_ROLES.chairperson, $rootScope.currentUser.roles);
            if ($scope.isChair) {
                $state.go('chair_console');
            } else {
                $state.go('user_console');
            }
        };
    }

})();
