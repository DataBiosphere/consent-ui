(function () {

    'use strict';

    angular.module('cmDataOwnerConsole')
        .controller('DataOwnerConsole', DataOwnerConsole);

    /* ngInject */
    function DataOwnerConsole($rootScope, cmPendingCaseService) {

        var vm = this;
        vm.dataOwnerUnreviewedCases = {};

        init();

        function init() {
            cmPendingCaseService.findDataOwnerUnReviewed($rootScope.currentUser.dacUserId,vm);
        }

    }

})();
