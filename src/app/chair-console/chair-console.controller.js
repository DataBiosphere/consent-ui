(function () {

    'use strict';

    angular.module('cmChairConsole')
        .controller('ChairConsole', ChairConsole);

    /* ngInject */
    function ChairConsole(cmPaginatorService, cmPendingCaseService,$rootScope) {

        var lists = {'dul': [], 'access': [], 'rp': []};
        var list_max_items = 5;

        var vm = this;
        vm.totalDulPendingVotes = 0;
        vm.totalAccessPendingVotes = 0;
        vm.totalResearchPurposePendingVotes = 0;

        vm.activePage = {'dul': 0, 'access': 0, 'rp': 0};
        vm.currentPages = {'dul': [], 'access': [], 'rp': []};
        vm.electionsList = {'dul': [], 'access': [], 'rp': []};
        // changePage function from the service with the first 2 parameters locked
        vm.changePage = _.partial(cmPaginatorService.changePage,
            // first parameter to lock from changePage
            lists, list_max_items,
            // second parameter to lock from changePage
            {
                activePage: vm.activePage,
                currentPages: vm.currentPages,
                electionsList: vm.electionsList
            }
        );

        init();

        function init() {
            cmPendingCaseService.findConsentPendingCasesByUser(lists,$rootScope.currentUser.dacUserId,vm);
            cmPendingCaseService.findDataRequestPendingCasesByUser(lists,$rootScope.currentUser.dacUserId,vm);
            //cmPendingCaseService.findResearchPurposePendingCasesByUser(lists,$rootScope.currentUser.dacUserId,vm);

        }
    }

})();
