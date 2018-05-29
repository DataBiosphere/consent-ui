(function () {

    'use strict';

    angular.module('cmUserConsole')
        .controller('UserConsole', UserConsole);

    /* ngInject */
    function UserConsole(cmPendingCaseService, $rootScope, $state) {

        var vm = this;
        vm.electionsList = {'dul': [], 'access': [], 'rp':[]};
        vm.totalDulPendingVotes = 0;
        vm.totalAccessPendingVotes = 0;
        vm.totalResearchPurposePendingVotes = 0;
        vm.currentDULPage = 1;
        vm.currentAccessPage = 1;
        vm.openDULReview = openDULReview;
        vm.openAccessReview = openAccessReview;

        init();

        function init() {
            if($rootScope.path === 'dul-review' && $rootScope.currentDULPage !== undefined) {
                vm.currentDULPage = $rootScope.currentDULPage;
            } else if($rootScope.path === 'access-review' && $rootScope.currentAccessPage !== undefined) {
                vm.currentAccessPage = $rootScope.currentAccessPage;
            }
            $rootScope.currentAccessPage = undefined;
            $rootScope.currentDULPage = undefined;
            $rootScope.path = undefined;
            cmPendingCaseService.findConsentPendingCasesByUser($rootScope.currentUser.dacUserId,vm);
            cmPendingCaseService.findDataRequestPendingCasesByUser($rootScope.currentUser.dacUserId,vm);

        }

        function openDULReview(consentId, voteId) {
            $rootScope.currentDULPage = vm.currentDULPage;
            $state.go('dul_review', { consentId: consentId, voteId: voteId });
        }

        function openAccessReview(darId, voteId, rpVoteId) {
            $rootScope.currentAccessPage = vm.currentAccessPage;
            $state.go('access_review', { darId: darId, voteId: voteId,  rpVoteId: rpVoteId});
        }
    }

})();
