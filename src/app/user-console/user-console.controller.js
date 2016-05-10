(function () {

    'use strict';

    angular.module('cmUserConsole')
        .controller('UserConsole', UserConsole);

    /* ngInject */
    function UserConsole(cmPendingCaseService, $rootScope) {

        var vm = this;
        vm.electionsList = {'dul': [], 'access': [], 'rp':[]};
        vm.totalDulPendingVotes = 0;
        vm.totalAccessPendingVotes = 0;
        vm.totalResearchPurposePendingVotes = 0;

        init();

        function init() {
            cmPendingCaseService.findConsentPendingCasesByUser($rootScope.currentUser.dacUserId,vm);
            cmPendingCaseService.findDataRequestPendingCasesByUser($rootScope.currentUser.dacUserId,vm);

        }
    }

})();
