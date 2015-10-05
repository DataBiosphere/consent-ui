(function () {

    'use strict';

    angular.module('cmChairConsole')
        .controller('ChairConsole', ChairConsole);

    /* ngInject */
    function ChairConsole(cmPendingCaseService,$rootScope) {

        var vm = this;
        vm.totalDulPendingVotes = 0;
        vm.totalAccessPendingVotes = 0;
        vm.totalResearchPurposePendingVotes = 0;

        vm.electionsList = {'dul': [], 'access': [], 'rp': []};

        init();

        function init() {
            cmPendingCaseService.findConsentPendingCasesByUser($rootScope.currentUser.dacUserId,vm);
            cmPendingCaseService.findDataRequestPendingCasesByUser($rootScope.currentUser.dacUserId,vm);

        }
    }

})();
