(function () {

    'use strict';

    angular.module('cmChairConsole')
        .controller('ChairConsole', ChairConsole);

    /* ngInject */
    function ChairConsole(cmPendingCaseService, $rootScope, $state) {

        var vm = this;
        vm.totalDulPendingVotes = 0;
        vm.totalAccessPendingVotes = 0;
        vm.totalResearchPurposePendingVotes = 0;
        vm.currentDULPage = 1;
        vm.currentAccessPage = 1;
        vm.openDULReview = openDULReview;
        vm.openDULReviewResult = openDULReviewResult;
        vm.openAccessReviewResult = openAccessReviewResult;
        vm.openAccessReview = openAccessReview;
        vm.openFinalAccessReviewResults = openFinalAccessReviewResults;
        vm.electionsList = { 'dul': [], 'access': [], 'rp': [] };
        $rootScope.pathFrom = 'chair_console';
        init();

        function init() {
            if (($rootScope.path === 'dul-review' || $rootScope.path === 'dul-review-results')
                && $rootScope.currentDULPage !== undefined) {
                vm.currentDULPage = $rootScope.currentDULPage;
            } else if (($rootScope.path === 'access-review' || $rootScope.path === 'access-review-results' || $rootScope.path === 'final-access-review-results')
                && $rootScope.currentAccessPage !== undefined) {
                vm.currentAccessPage = $rootScope.currentAccessPage;
            }
            $rootScope.currentAccessPage = undefined;
            $rootScope.currentDULPage = undefined;
            $rootScope.path = undefined;
            cmPendingCaseService.findConsentPendingCasesByUser($rootScope.currentUser.dacUserId, vm);
            cmPendingCaseService.findDataRequestPendingCasesByUser($rootScope.currentUser.dacUserId, vm);

        }

        function openDULReview(consentId, voteId) {
            $rootScope.currentDULPage = vm.currentDULPage;
            $state.go('dul_review', { consentId: consentId, voteId: voteId });
        }

        function openDULReviewResult(consentId) {
            $rootScope.currentDULPage = vm.currentDULPage;
            $state.go('dul_review_results', { consentId: consentId });
        }

        function openAccessReviewResult(referenceId, electionId, ) {
            $rootScope.currentAccessPage = vm.currentAccessPage;
            $state.go('access_review_results', { referenceId: referenceId, electionId: electionId });
        }

        function openAccessReview(darId, voteId, rpVoteId) {
            $rootScope.currentAccessPage = vm.currentAccessPage;
            $state.go('access_review', { darId: darId, voteId: voteId, rpVoteId: rpVoteId });
        }

        function openFinalAccessReviewResults(referenceId, electionId, rpElectionId) {
            $rootScope.currentAccessPage = vm.currentAccessPage;
            $state.go('final_access_review_results', { referenceId: referenceId, electionId: electionId, rpElectionId: rpElectionId });
        }

    }

})();
