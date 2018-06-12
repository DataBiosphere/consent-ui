(function () {
    'use strict';

    angular.module('cmReviewResults')
        .controller('DulPreviewResults', DulPreviewResults);

    function DulPreviewResults($sce, apiUrl, $scope, $rootScope, $modal, $state, consent, cmFilesService, electionReview, cmElectionService) {
        $scope.hasAdminRole = $rootScope.hasRole($rootScope.userRoles.admin);
        $scope.consent = consent;
        $scope.election = electionReview.election;

        if (typeof electionReview.election !== 'undefined' && cmElectionService.hasElectionValues(electionReview.election.dulName, electionReview.election.translatedUseRestriction)) {
            $scope.dataUseLetter = electionReview.election.dataUseLetter;
            $scope.dulName = electionReview.election.dulName;
            $scope.structuredDataUseLetter = $sce.trustAsHtml(electionReview.election.translatedUseRestriction);
        } else {
            $scope.dataUseLetter = $scope.consent.dataUseLetter;
            $scope.dulName = $scope.consent.dulName;
            $scope.structuredDataUseLetter = $sce.trustAsHtml($scope.consent.translatedUseRestriction);
        }

        $scope.consentName = consent.name;
        $scope.downloadUrl = apiUrl + 'consent/' + $scope.consent.consentId + '/dul';
        $scope.consentGroupName = $sce.trustAsHtml(consent.groupName);
        $rootScope.path = 'dul-preview-results';
        $scope.downloadDUL = function(){
            cmFilesService.getDULFile($scope.consent.consentId, $scope.consent.dulName);
        };

    }

})();
